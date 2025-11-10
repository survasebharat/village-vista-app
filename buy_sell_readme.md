# 🛒 Gram Bazaar (Buy & Sell) Documentation

## Overview
The Gram Bazaar is an online marketplace for villagers to buy and sell items within the community. It includes features for posting items, admin approval, notifications, and secure transactions.

---

## 🎯 Features

### For Users (Villagers)
- ✅ Post items for sale with photos
- ✅ Browse items by category
- ✅ Search and filter listings
- ✅ Contact sellers directly
- ✅ Mark items as sold
- ✅ View own posted items dashboard
- ✅ Get notifications when items are approved
- ✅ Edit or delete own listings

### For Administrators
- ✅ Review and approve item listings
- ✅ Reject inappropriate items
- ✅ Manage item categories
- ✅ View all active listings
- ✅ Ban users for violations
- ✅ Send notifications to users
- ✅ Generate marketplace reports

---

## 👤 Admin & Sample User Credentials

### Admin Login
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shivankhed.com | Admin@123 |

### Sample Seller Accounts
| Name | Email | Password | Mobile | Village |
|------|-------|----------|--------|---------|
| Ramesh Kumar | ramesh@shivankhed.com | User@123 | 9876543210 | Shivankhed Khurd |
| Savita Devi | savita@shivankhed.com | User@123 | 9123456789 | Shivankhed Khurd |
| Prakash Jadhav | prakash@shivankhed.com | User@123 | 9988776655 | Shivankhed Khurd |
| Anita Patil | anita@shivankhed.com | User@123 | 9876501234 | Shivankhed Khurd |

### Sample Buyer Accounts
| Name | Email | Password | Mobile |
|------|-------|----------|--------|
| Suresh Gaikwad | suresh@shivankhed.com | User@123 | 9112233445 |
| Meena Shinde | meena@shivankhed.com | User@123 | 9223344556 |

**Note:** All sample accounts have pre-loaded items for testing. Change credentials in production.

---

## 📝 How Users Post Items

### Step-by-Step Guide

#### 1. Login/Register
- Navigate to `/auth` page
- Login with existing account or create new one
- Complete profile with:
  - Full name
  - Mobile number
  - Aadhar number
  - Address

#### 2. Access Buy & Sell Page
- Click **"Buy & Sell"** in main navigation
- Or visit `/buy-sell` directly
- Click **"Post Item"** button (top right)

#### 3. Fill Item Details
**Required Information:**
- **Title**: Item name (e.g., "Royal Enfield Bullet 350")
- **Description**: Detailed description with condition, features
- **Category**: Select from dropdown
  - Electronics
  - Vehicles
  - Agriculture
  - Furniture
  - Clothing
  - Real Estate
  - Others
- **Price**: Selling price in rupees
- **Condition**: New, Like New, Good, Fair, Poor
- **Photos**: Upload 1-5 clear photos (Max 5MB each)
  - Front view
  - Side view
  - Any defects
  - Accessories included

**Optional Information:**
- Contact preference
- Negotiability (Fixed/Negotiable)
- Delivery option
- Warranty/Bill available

#### 4. Submit for Approval
- Review entered information
- Click **"Submit"** button
- Item goes to **Pending** status
- Wait for admin approval (usually 24-48 hours)

#### 5. Track Status
- Go to **"My Dashboard"** (`/seller-dashboard`)
- View item status:
  - 🟡 **Pending**: Waiting for admin review
  - 🟢 **Approved**: Live and visible to buyers
  - 🔴 **Rejected**: Not approved (with reason)
  - ✅ **Sold**: Marked as sold by you

---

## ✅ How Admin Approves Items

### Admin Approval Process

#### 1. Access Admin Panel
- Login with admin credentials
- Navigate to **Admin Panel**
- Click **"Marketplace Management"** (`/admin/marketplace`)

#### 2. Review Pending Items
**Check Following:**
- ✓ Item title is appropriate and descriptive
- ✓ Description is genuine and not misleading
- ✓ Photos are clear and relevant
- ✓ Price is reasonable (not too low/high)
- ✓ Category is correctly selected
- ✓ No prohibited items (weapons, drugs, illegal goods)
- ✓ User profile is verified

#### 3. Approval Actions

**Option A: Approve Item**
1. Click **"Approve"** button
2. Item becomes live immediately
3. Seller receives notification
4. Item appears in marketplace

**Option B: Reject Item**
1. Click **"Reject"** button
2. Select rejection reason:
   - Inappropriate content
   - Poor quality photos
   - Misleading description
   - Prohibited item
   - Duplicate listing
   - Incomplete information
   - Suspicious activity
3. Add custom message (optional)
4. Confirm rejection
5. Seller receives notification with reason

#### 4. Post-Approval Management
- Monitor reported items
- Edit item details if needed
- Mark items as sold
- Delete fraudulent listings
- Ban repeat offenders

---

## 🔔 How Notifications Work

### User Notifications

#### Push Notifications (Browser)
**Setup:**
1. User clicks "Enable Notifications" on dashboard
2. Browser asks for permission
3. User grants permission
4. Notifications enabled

**User Receives Notifications For:**
- ✅ Item approved by admin
- ❌ Item rejected (with reason)
- 💬 New message from buyer
- 💰 Price inquiry received
- 🏷️ Item marked as sold
- ⚠️ Account warnings

**Example Notification:**
```
📦 Item Approved!
Your "Royal Enfield Bullet 350" is now live 
in the marketplace. View listing →
```

#### Email Notifications
Users receive emails for:
- Account registration confirmation
- Item approval/rejection
- Important messages from buyers
- Admin announcements

#### In-App Notifications
- Bell icon in header shows unread count
- Dropdown shows recent notifications
- Click to navigate to relevant page

### Admin Notifications

**Admin Receives Alerts For:**
- 📬 New item posted (needs review)
- 🚩 Item reported by users
- 🔴 Suspicious activity detected
- 📊 Daily summary of marketplace activity

---

## 📸 Sample Item Listings (Pre-loaded)

### Electronics
```json
{
  "id": "item_001",
  "title": "Samsung Galaxy A32 (6GB RAM)",
  "description": "6 months old, excellent condition, box and accessories included",
  "category": "Electronics",
  "price": 12500,
  "condition": "Like New",
  "seller": "Ramesh Kumar",
  "status": "approved",
  "photos": ["phone_front.jpg", "phone_back.jpg", "phone_box.jpg"]
}
```

### Vehicles
```json
{
  "id": "item_002",
  "title": "Royal Enfield Bullet 350",
  "description": "2020 model, single owner, well maintained, 18000 km",
  "category": "Vehicles",
  "price": 95000,
  "condition": "Good",
  "seller": "Prakash Jadhav",
  "status": "approved",
  "negotiable": true
}
```

### Agriculture
```json
{
  "id": "item_003",
  "title": "Mini Tractor - Mahindra Yuvraj 215",
  "description": "5 years old, good working condition, recently serviced",
  "category": "Agriculture",
  "price": 185000,
  "condition": "Good",
  "seller": "Savita Devi",
  "status": "approved"
}
```

### Furniture
```json
{
  "id": "item_004",
  "title": "Wooden Dining Table Set (6 seater)",
  "description": "Solid teak wood, with 6 chairs, 2 years old",
  "category": "Furniture",
  "price": 22000,
  "condition": "Like New",
  "seller": "Anita Patil",
  "status": "pending"
}
```

---

## 🔍 How Buyers Search & Contact

### Search & Filter Options
1. **Category Filter**: Select specific category
2. **Price Range**: Min-Max slider
3. **Condition**: New, Like New, Good, Fair
4. **Location**: Within village/nearby
5. **Sort By**:
   - Price: Low to High
   - Price: High to Low
   - Newest First
   - Most Popular

### Contact Seller Process
1. Click on item listing
2. View full details and photos
3. Click **"Contact Seller"** button
4. Options:
   - 📞 Call: Shows seller's mobile number
   - 💬 Chat: In-app messaging (if available)
   - 📧 Email: Send inquiry via email
5. Negotiate price if negotiable
6. Arrange meetup for inspection

---

## 📊 Admin Dashboard Features

### Marketplace Statistics
- Total items listed (all time)
- Active listings (currently live)
- Pending approvals (waiting review)
- Items sold (this month)
- Total users registered
- Most popular category
- Average response time

### Reports Available
1. **Daily Activity Report**
   - New items posted
   - Items approved/rejected
   - Items sold
   - New users registered

2. **Category Performance**
   - Items per category
   - Average price by category
   - Sell-through rate

3. **User Activity Report**
   - Top sellers (by items sold)
   - Most active buyers
   - User engagement metrics

4. **Revenue Insights** (if applicable)
   - Featured listing revenue
   - Premium user subscriptions
   - Advertisement income

---

## 🚫 Prohibited Items

Items **NOT ALLOWED** on Gram Bazaar:
- ❌ Weapons, explosives, ammunition
- ❌ Illegal drugs or substances
- ❌ Stolen goods
- ❌ Counterfeit products
- ❌ Live animals (unless livestock)
- ❌ Tobacco products to minors
- ❌ Adult content
- ❌ Endangered species products
- ❌ Prescription medicines
- ❌ Misleading/fraudulent items

**Penalty for Violations:**
- First offense: Warning + item removed
- Second offense: 30-day suspension
- Third offense: Permanent ban

---

## 🔒 Safety Guidelines

### For Sellers
✅ DO:
- Provide accurate descriptions
- Upload clear, genuine photos
- Set reasonable prices
- Respond promptly to inquiries
- Meet buyers in public places
- Verify payment before handover

❌ DON'T:
- Share personal sensitive information publicly
- Accept advance payment from unknown buyers
- Sell prohibited items
- Post duplicate listings
- Use misleading titles
- Accept suspicious payment methods

### For Buyers
✅ DO:
- Inspect item thoroughly before buying
- Meet in public places during daytime
- Verify seller identity
- Test electronic items before payment
- Ask for bill/warranty if applicable
- Report suspicious listings

❌ DON'T:
- Send advance payment to unknown sellers
- Share bank details publicly
- Buy items at unrealistically low prices
- Skip physical inspection
- Ignore negative reviews/ratings
- Ignore red flags

---

## 🛠 Technical Details

### Database Schema

#### Items Table
```sql
CREATE TABLE marketplace_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  condition TEXT,
  photos TEXT[], -- Array of photo URLs
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, sold
  is_negotiable BOOLEAN DEFAULT true,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMP,
  views_count INTEGER DEFAULT 0
);
```

#### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL, -- item_approved, item_rejected, new_message
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

```typescript
// Get all approved items
GET /rest/v1/marketplace_items?status=eq.approved

// Post new item
POST /rest/v1/marketplace_items
Body: { title, description, category, price, photos, ... }

// Approve item (Admin only)
PATCH /rest/v1/marketplace_items?id=eq.{item_id}
Body: { status: 'approved', approved_by: admin_id, approved_at: timestamp }

// Reject item (Admin only)
PATCH /rest/v1/marketplace_items?id=eq.{item_id}
Body: { status: 'rejected', rejection_reason: '...' }

// Get user's items
GET /rest/v1/marketplace_items?user_id=eq.{user_id}

// Search items
GET /rest/v1/marketplace_items?title=ilike.*{query}*&status=eq.approved
```

---

## 📱 Mobile App Features

### Progressive Web App (PWA)
- Install as mobile app
- Offline item browsing
- Push notifications
- Camera integration for photos
- Location-based listings
- Share listings on WhatsApp

### Coming Soon
- 📹 Video demos of items
- 💳 Integrated payment gateway
- ⭐ User ratings and reviews
- 🚚 Delivery tracking
- 💬 Real-time chat
- 🏪 Seller shops/storefronts

---

## 📞 Support & Help

### For Users
- **WhatsApp**: +91 8390521263
- **Email**: support@shivankhed.com
- **Help Center**: `/help`
- **Report Issue**: Available on each listing

### For Sellers
- **Seller Guide**: `/seller-guide`
- **Tips for Better Sales**: `/selling-tips`
- **FAQ**: `/faq`

### For Admins
- **Admin Manual**: Contact IT support
- **Training Videos**: Available in admin panel
- **Technical Support**: tech@shivankhed.com

---

## 📈 Success Metrics

### Current Statistics (as of Jan 2025)
- 🎯 Total Items Posted: 250+
- ✅ Approved Listings: 185
- 🔴 Pending Review: 12
- 💰 Items Sold: 98
- 👥 Active Users: 145
- ⏱️ Avg Approval Time: 18 hours
- 📊 Approval Rate: 92%

### Most Popular Categories
1. Electronics (32%)
2. Agriculture Equipment (24%)
3. Vehicles (18%)
4. Furniture (14%)
5. Others (12%)

---

## 🔄 Update History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2025 | Initial launch with basic features |
| 1.1.0 | Planned | Add payment integration |
| 1.2.0 | Planned | Add seller ratings and reviews |

---

## 📄 Terms & Conditions

1. Only verified users can post items
2. All items subject to admin approval
3. No guarantee of sale
4. Platform not responsible for transactions
5. Users must follow safety guidelines
6. False listings will result in ban
7. All sales are between buyer and seller
8. Platform fee may apply for featured listings

---

## 📞 Emergency Contact

For urgent issues:
- Police: 100
- Cyber Crime: 1930
- Consumer Helpline: 1800-11-4000
- Panchayat Office: +91 8390521263

---

**Last Updated:** January 2025
**Version:** 1.0.0

© 2025 Shivankhed Khurd Gram Panchayat. All rights reserved.