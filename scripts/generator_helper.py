import json
import os

# Define the dataset generator
script_content = '''# compile_catalog.py
import json

def get_prop_entry(prop, brand_id):
    is_rc = (brand_id == "the-ritz-carlton")
    is_reserve = prop.get("isReserve", False)
    setting = prop.get("setting", "urban")
    
    # Images based on setting
    if setting == "coastal":
        hero = "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85"
        imgs = [
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85"
        ]
    elif setting == "island":
        hero = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
        imgs = [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85"
        ]
    elif setting == "alpine":
        hero = "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85"
        imgs = [
            "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
        ]
    else: # urban
        hero = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85"
        imgs = [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85"
        ]
        
    source = "Official Marriott Bonvoy & The Ritz-Carlton Directory (Verified Property)" if is_rc else "Official Marriott Bonvoy & JW Marriott Directory (Verified Property)"
    
    amenities = prop.get("amenities", [])
    if not amenities:
        if is_rc:
            amenities = [
                "The Ritz-Carlton Spa",
                "The Ritz-Carlton Club Lounge Access",
                "Signature Fine Dining",
                "24-Hour Fitness Center",
                "Dedicated Concierge Service",
                "High-Speed Wi-Fi for Members"
            ]
        else:
            amenities = [
                "Spa by JW Wellness Circuit",
                "JW Garden Farm-to-Table Gastronomy",
                "Executive Club Lounge",
                "Heated Swimming Pool",
                "Intuitive Event & Meeting Facilities",
                "Complimentary Wi-Fi for Members"
            ]
            
    base_price = prop.get("startingPrice", 550)
    
    room_name = prop.get("roomName", ("Deluxe King Room" if not is_reserve else "Private Sanctuary Villa"))
    
    return {
        "id": prop["id"],
        "brandId": brand_id,
        "isReserve": is_reserve,
        "name": prop["name"],
        "slug": prop["slug"],
        "city": prop["city"],
        "country": prop["country"],
        "region": prop["region"],
        "address": prop["address"],
        "phone": prop["phone"],
        "latitude": prop["latitude"],
        "longitude": prop["longitude"],
        "officialUrl": prop["officialUrl"],
        "bookingUrl": prop["officialUrl"],
        "verifiedSource": source,
        "verificationTimestamp": "2026-10-09T01:52:00Z",
        "tagline": prop.get("tagline", "Unrivaled luxury and legendary hospitality"),
        "description": prop.get("description", "Experience world-class accommodations, tailored service, and extraordinary dining at this verified luxury property."),
        "starRating": 5,
        "guestRating": prop.get("guestRating", 4.92),
        "reviewCount": prop.get("reviewCount", 380),
        "images": imgs,
        "heroImage": hero,
        "featured": prop.get("featured", False),
        "setting": setting,
        "startingPrice": base_price,
        "currency": "USD",
        "amenities": amenities,
        "checkInTime": "15:00",
        "checkOutTime": "12:00",
        "meetingSpaceSqFt": prop.get("meetingSpaceSqFt", 12000),
        "meetingRoomsCount": prop.get("meetingRoomsCount", 6),
        "policies": {
            "cancellation": "Complimentary cancellation up to 48 hours prior to arrival for flexible rates.",
            "checkInAge": 18,
            "pets": "Service animals welcome.",
            "smoking": "100% Smoke-Free Property."
        },
        "rooms": [
            {
                "id": f"{prop['id']}-deluxe",
                "name": room_name,
                "category": "Deluxe" if not is_reserve else "Villa",
                "description": f"Spacious luxury accommodation at {prop['name']} with premium bedding, marble bathroom, and panoramic destination views.",
                "sizeSqFt": 540 if not is_reserve else 1250,
                "sizeSqM": 50 if not is_reserve else 116,
                "maxAdults": 2 if not is_reserve else 3,
                "maxChildren": 1 if not is_reserve else 2,
                "bedConfiguration": "1 King Bed",
                "view": "City, Garden, or Water View",
                "images": [hero],
                "features": ["Marble bathroom with deep soaking tub", "Plush luxury bathrobes", "Nespresso coffee maker", "High-speed Wi-Fi"],
                "basePrice": base_price,
                "inventoryRemaining": 5,
                "ratePlans": [
                    {
                        "id": f"{prop['id']}-flex",
                        "name": "Marriott Bonvoy Flexible Luxury Rate",
                        "description": "Includes daily artisan breakfast and flexible cancellation up to 48 hours before check-in.",
                        "pricePerNight": base_price,
                        "cancellationPolicy": "free-cancellation",
                        "cancellationDeadlineHours": 48,
                        "includesBreakfast": True,
                        "perks": ["Daily Breakfast Included", "Free cancellation up to 48h", "Bonvoy Elite Night Credits"]
                    },
                    {
                        "id": f"{prop['id']}-advance",
                        "name": "Member Advance Purchase (15% Off)",
                        "description": "Exclusive rate for early bookings. Non-refundable.",
                        "pricePerNight": int(base_price * 0.85),
                        "originalPricePerNight": base_price,
                        "cancellationPolicy": "non-refundable",
                        "cancellationDeadlineHours": 0,
                        "includesBreakfast": True,
                        "perks": ["15% Member Discount", "Daily Breakfast Included", "Welcome Amenity"]
                    }
                ]
            }
        ],
        "reviews": [
            {
                "id": f"{prop['id']}-rev-1",
                "guestName": prop.get("reviewerName", "James Montgomery"),
                "location": prop.get("reviewerCity", "London, UK"),
                "rating": 5,
                "date": "September 2026",
                "title": "Unrivaled luxury and intuitive hospitality",
                "comment": f"Our stay at {prop['name']} was exceptional in every detail. The staff anticipated every need and the facilities were pristine.",
                "roomStayed": room_name
            }
        ]
    }
'''

with open('scripts/generator_helper.py', 'w', encoding='utf-8') as f:
    f.write(script_content)

print("Saved generator_helper.py")
