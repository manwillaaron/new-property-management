update properties 
set   
            address = $1,
            num_beds = $2,
            num_baths = $3,
            square_footage = $4,
            acreage = $5,
            rent = $6,
            gas_company = $7,
            electric_company = $8,
            has_renter = $9,
            fridge_included = $10,
            dishwasher_included = $11,
            washer_dryer_included = $12,
            mortgage = $13,
            tax_yearly = $14,
            img_url = $15,
            img_url2 = $16,
            img_url3 = $17,
            img_url4 = $18,
            img_url5 = $19,
            property_name = $20      
where prop_id = $21;

-- select * from properties_admin pa
-- join  properties p
-- on p.prop_id = pa.prop_id
-- join admin a 
-- on a.admin_id = pa.admin_id
-- where pa.admin_id = $22;

