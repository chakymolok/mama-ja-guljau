// Vercel Serverless Function: /api/views
// Do not put tokens into GitHub.
// Add these variables in Vercel:
// UPSTASH_REDIS_REST_URL
// UPSTASH_REDIS_REST_TOKEN

export default async function handler(req, res) {
  const { slug = "home", inc } = req.query;
  const safeSlug = String(slug).replace(/[^a-zA-Z0-9а-яА-ЯёЁ._:-]/g, "").slice(0, 120);
  const key = `mama:gulyayu:views:${safeSlug}`;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (!redisUrl || !redisToken) {
    return res.status(200).json({
      slug: safeSlug,
      views: 0,
      configured: false
    });
  }

  try {
    const command = inc === "1" ? ["INCR", key] : ["GET", key];

    const response = await fetch(redisUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(command)
    });

    const data = await response.json();
    const views = Number(data.result || 0);

    return res.status(200).json({
      slug: safeSlug,
      views,
      configured: true
    });
  } catch (error) {
    return res.status(500).json({
      slug: safeSlug,
      views: 0,
      error: "views_counter_failed"
    });
  }
}
