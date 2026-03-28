# Strapi v4 – Collection Schema Reference

## 1. Global Setting (Single Type)

| Field            | Type         | Required | Notes                    |
|------------------|-------------|----------|--------------------------|
| siteName         | Short text  | Yes      |                          |
| siteDescription  | Long text   | Yes      |                          |
| logo             | Media       | Yes      | Single image             |
| favicon          | Media       | Yes      | Single image             |
| email            | Email       | Yes      |                          |
| phone            | Short text  | Yes      |                          |
| address          | Long text   | Yes      |                          |
| socialLinks      | Component (repeatable) | No | platform + url     |
| footerText       | Short text  | Yes      |                          |
| googleAnalyticsId| Short text  | No       |                          |

## 2. Banners (Collection Type)

| Field     | Type       | Required | Notes              |
|-----------|-----------|----------|--------------------|
| title     | Short text| Yes      |                    |
| subtitle  | Short text| No       |                    |
| image     | Media     | Yes      | Single image       |
| ctaText   | Short text| No       |                    |
| ctaLink   | Short text| No       |                    |
| isActive  | Boolean   | Yes      | Default: true      |
| order     | Integer   | Yes      | Sort order         |

## 3. Services (Collection Type)

| Field       | Type                    | Required | Notes              |
|-------------|------------------------|----------|--------------------|
| title       | Short text             | Yes      |                    |
| slug        | UID (from title)       | Yes      | Auto-generated     |
| description | Rich text              | Yes      |                    |
| icon        | Short text             | Yes      | Icon name          |
| image       | Media                  | No       | Single image       |
| features    | Component (repeatable) | No       | { value: string }  |
| order       | Integer                | Yes      |                    |

## 4. Projects (Collection Type)

| Field       | Type              | Required | Notes              |
|-------------|------------------|----------|--------------------|
| title       | Short text       | Yes      |                    |
| slug        | UID (from title) | Yes      | Auto-generated     |
| description | Rich text        | Yes      |                    |
| thumbnail   | Media            | Yes      | Single image       |
| images      | Media            | No       | Multiple images    |
| client      | Short text       | Yes      |                    |
| category    | Short text       | Yes      |                    |
| techStack   | Component (rep.) | No       | { value: string }  |
| liveUrl     | Short text       | No       |                    |
| completedAt | Date             | Yes      |                    |

## 5. Contact Messages (Collection Type)

| Field   | Type       | Required | Notes        |
|---------|-----------|----------|--------------|
| name    | Short text| Yes      |              |
| email   | Email     | Yes      |              |
| phone   | Short text| No       |              |
| subject | Short text| Yes      |              |
| message | Long text | Yes      |              |

> **Lưu ý**: Strapi tự động thêm `id`, `createdAt`, `updatedAt`.
