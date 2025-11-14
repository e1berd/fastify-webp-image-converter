# 🏙️ Sharptown — Fastify Image Transformer API & Plugin

A high-performance image transformation and conversion service powered by Fastify + Sharp.
Resize, rotate, blur, grayscale, modify alpha, convert formats — all on-the-fly via REST API.

Perfect for web developers optimizing image delivery 🚀


## ✨ Features
- Convert any supported format to any other (WebP, PNG, JPEG, GIF, AVIF…)
- Resize: width / height
- Rotate / Flip
- Blur
- Grayscale / Greyscale
- RGB tint filter (r, g, b)
- Alpha control: removeAlpha / ensureAlpha
- Docker-ready
- Fully configurable via `.env`

## 📡 API Endpoints
### 🔄 Transform Image — POST /api/v1/transform

Upload an image and apply any transformations through query parameters.

| Name                      | Type    | Description                                              |
| ------------------------- | ------- | -------------------------------------------------------- |
| `width`                   | number  | Resize width                                             |
| `height`                  | number  | Resize height                                            |
| `rotate`                  | number  | Rotate (°)                                               |
| `flip`                    | boolean | Flip horizontally                                        |
| `blur`                    | number  | Blur radius                                              |
| `r`, `g`, `b`             | number  | RGB tint                                                 |
| `grayscale` / `greyscale` | boolean | Convert to grayscale                                     |
| `removeAlpha`             | boolean | Remove alpha channel                                     |
| `ensureAlpha`             | boolean | Ensure alpha channel                                     |
| `convertTo`               | string  | Output format: `webp`, `png`, `jpg`, `gif`, `avif`, etc. |


## Example Request
```bash
curl -X POST \
  -F "image=@input.jpg" \
  "http://localhost:3000/api/v1/transform?width=500&blur=3&convertTo=webp"
```

## 🚀 Getting Started
Local Development
```bash
git clone https://github.com/eckeriaue/sharptown.git
cd sharptown
npm install
cp .env.example .env
npm run dev:env
```

## Docker
```bash
docker build -t sharptown .
docker run -p 3000:3000 -d sharptown
```

## 🔁 API Response

On success → binary image is returned
On error → JSON

```JSON
{
  "error": "Unsupported format"
}
```

## 🔌 Fastify Plugin Usage
Sharptown can also be used as a Fastify plugin inside your server.
Example usage will be published soon.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m "feat: add amazing feature"
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Create a pull request


## 🧩 Roadmap
- Astro + Starlight documentation website
- OpenAPI / Swagger support
- Extra filters: sharpen, contrast, saturation
- Batch image processing

If you'd like, I can also:
- Publish a Fastify plugin to npm
- Build Swagger docs automatically
- Anything you'd like to adjust — just tell me!
