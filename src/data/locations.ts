export interface StateDistrictMap {
  [stateName: string]: string[];
}

export const INDIAN_STATES_DISTRICTS: StateDistrictMap = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'Assam': ['Baksa', 'Barpeta', 'Cachar', 'Darrang', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Guwahati (Kamrup)', 'Jorhat', 'Nagaon', 'Silchar', 'Sonitpur', 'Tinsukia'],
  'Bihar': ['Araria', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'Gaya', 'Katihar', 'Madhubani', 'Muzaffarpur', 'Nalanda', 'Patna', 'Purnia', 'Rohtas', 'Samastipur', 'Saran', 'Vaishali'],
  'Delhi (NCT)': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Mehsana', 'Morbi', 'Rajkot', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad'],
  'Haryana': ['Ambala', 'Bhiwani', 'Faridabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Karnal', 'Kurukshetra', 'Panipat', 'Rohtak', 'Sonipat', 'Yamunanagar'],
  'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chikkamagaluru', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Hassan', 'Hubballi', 'Kalaburagi', 'Mandya', 'Mysuru', 'Shivamogga', 'Tumakuru', 'Udupi'],
  'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'Madhya Pradesh': ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Khandwa', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Ujjain', 'Vidisha'],
  'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Kolhapur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nashik', 'Pune', 'Sangli', 'Satara', 'Solapur', 'Thane'],
  'Odisha': ['Balasore', 'Bhadrak', 'Cuttack', 'Ganjam', 'Jharsuguda', 'Kalahandi', 'Khordha (Bhubaneswar)', 'Mayurbhanj', 'Puri', 'Rayagada', 'Rourkela (Sundargarh)', 'Sambalpur'],
  'Punjab': ['Amritsar', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Ludhiana', 'Mohali (SAS Nagar)', 'Patiala', 'Sangrur'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Bikaner', 'Bhilwara', 'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kota', 'Nagaur', 'Sikar', 'Udaipur'],
  'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Madurai', 'Nagapattinam', 'Namakkal', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'Telangana': ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahabubnagar', 'Medak', 'Nalgonda', 'Nizamabad', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Warangal'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Ghaziabad', 'Gorakhpur', 'Jhansi', 'Kanpur Nagar', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Noida (Gautam Buddha Nagar)', 'Prayagraj', 'Varanasi'],
  'West Bengal': ['Bankura', 'Birbhum', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Purba Medinipur', 'South 24 Parganas']
};

export const PM_VISHWAKARMA_18_TRADES = [
  'Carpenter (Suthar)',
  'Boat Maker',
  'Armourer',
  'Blacksmith (Lohar)',
  'Hammer and Tool Kit Maker',
  'Locksmith',
  'Sculptor (Moortikar, stone carver)',
  'Stone breaker',
  'Goldsmith (Sonar)',
  'Potter (Kumhaar)',
  'Cobbler (Charmkar) / Shoesmith / Footwear artisan',
  'Mason (Rajmistri)',
  'Basket / Mat / Broom Maker / Coir Weaver',
  'Doll & Toy Maker (Traditional)',
  'Barber (Naai)',
  'Garland maker (Malakaar)',
  'Washerman (Dhobi)',
  'Tailor (Darzi)',
  'Fishing Net Maker'
];
