# Notion Lead Backup Setup

Form submissions are backed up to a Notion database after being sent via Web3Forms. This is optional — forms work without Notion, but leads won't be stored in a searchable database.

## 1. Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name: "DS Crédito Leads"
4. Select your workspace
5. Capabilities: Read + Insert content
6. Copy the **Internal Integration Secret** (starts with `ntn_`)

## 2. Create the Leads Database

Create a new database in Notion with these properties:

| Property | Type | Notes |
|----------|------|-------|
| Name | Title | Auto-created |
| Email | Email | |
| Phone | Phone | |
| Source | Select | Options: "B2B Contact", "B2C Credit Request" |
| Role | Rich text | For B2B: agent/developer/etc. |
| Details | Rich text | For B2B: message. For B2C: credit details. |
| Status | Select | Options: "New", "Contacted", "In Progress", "Closed" |

## 3. Connect the Integration to the Database

1. Open your leads database in Notion
2. Click "..." menu (top right) > "Connections"
3. Search for "DS Crédito Leads" and add it

## 4. Get the Database ID

The database ID is in the URL when you open the database:
```
https://www.notion.so/workspace/DATABASE_ID?v=...
```

It's the 32-character hex string before the `?v=`.

## 5. Configure Environment Variables

### Vercel (Production)

1. Go to your Vercel project > Settings > Environment Variables
2. Add:
   - `NOTION_API_KEY` = your integration secret
   - `NOTION_DATABASE_ID` = the 32-char database ID
3. Redeploy

### Local Development

Add to `.env.local`:
```
NOTION_API_KEY=ntn_your_secret_here
NOTION_DATABASE_ID=your_database_id_here
```

## How It Works

- After a successful Web3Forms submission, the form also sends a POST to `/api/lead`
- The API route creates a new page in the Notion database with the form data
- This is fire-and-forget: if Notion is down, the form still works (Web3Forms email goes through)
- B2B submissions include: name, email, phone, role, message
- B2C submissions include: name, email, phone, plus all credit details (operation type, financing value, income, etc.)

## Troubleshooting

- **Leads not appearing in Notion:** Check that the integration is connected to the database and env vars are set
- **API returns 503:** `NOTION_API_KEY` or `NOTION_DATABASE_ID` not configured
- **API returns 502:** Notion API rejected the request — check server logs for details
