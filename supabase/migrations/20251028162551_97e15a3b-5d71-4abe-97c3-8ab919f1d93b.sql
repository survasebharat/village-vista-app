-- Add sample news ticker data to village config
UPDATE village_config 
SET config_data = jsonb_set(
  config_data,
  '{newsTicker}',
  '[
    {
      "id": "news-1",
      "text": "New community health center opening ceremony on December 15th at 10:00 AM",
      "priority": "high"
    },
    {
      "id": "news-2",
      "text": "Free vaccination camp for all age groups this Saturday at Primary Health Center",
      "priority": "high"
    },
    {
      "id": "news-3",
      "text": "₹50 lakhs sanctioned for village road repair and maintenance work",
      "priority": "medium"
    },
    {
      "id": "news-4",
      "text": "Digital literacy training program registration open for youth - Contact Panchayat Office",
      "priority": "medium"
    },
    {
      "id": "news-5",
      "text": "Farmers market every Sunday from 7:00 AM to 11:00 AM at village square",
      "priority": "low"
    }
  ]'::jsonb
)
WHERE language = 'en' AND village_id = '17bc6072-3df4-4513-9c25-878660f77747';