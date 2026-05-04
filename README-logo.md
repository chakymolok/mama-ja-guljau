# Логотип и favicon

Добавлено:

- `assets/mama-logo-rope.png` - логотип для шапки;
- `assets/favicon.png` - favicon и apple-touch-icon.

В HTML старый зелёный кружок заменён на:

```html
<img src="assets/mama-logo-rope.png" alt="Мама, я гуляю" class="logo-mark-img" />
```

Для страниц внутри `/digests/...` путь автоматически заменён на:

```html
<img src="../../assets/mama-logo-rope.png" alt="Мама, я гуляю" class="logo-mark-img" />
```
