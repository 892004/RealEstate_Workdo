import Blog1img from '../public/Images/Blog1.webp'
import Blog2img from '../public/Images/Blog2.webp'
import Blog3img from '../public/Images/Blog3.webp'
import Blog4img from '../public/Images/Blog4.webp'
import Blog5img from '../public/Images/Blog5.webp'
import { slugify } from '../utils/slugify'
const blogData =[
    {
        id:1,
        tag:"realestate",
        img:Blog1img,
        title:"Dream House Diaries Points Over Penthouses",
        slug:"Dream-House-Diaries-Points-Over-Penthouses",
        para:"where we challenge conventional notions of luxury living and explore the unique joys of prioritizing points over penthouses. In a world where material possessions often take center stage, we invite you to embark on a journey that focuses on the intangible elements that truly make a house a home. At Dream House Diaries, we believe that a home is not defined solely by its grandeur or opulence but by the experiences, memories, and connections it fosters. Instead of pursuing extravagant penthouses, we encourage you to consider the following points when crafting your dream house Rather than aiming for the highest floor in a luxury high-rise, we prioritize finding a home in a location that aligns with your lifestyle and values. Whether it's a peaceful neighborhood, a close-knit community, or proximity to nature, choosing the right location ensures a fulfilling and enriching living experience. While penthouses may offer spacious layouts and extravagant features, we emphasize the importance of practical and functional design. Thoughtful floor plans, efficient use of space, and intelligent storage solutions create a home that enhances your daily life and accommodates your unique needs. Whether it's incorporating your favorite colors, displaying cherished artwork, or creating cozy nooks, these elements contribute to a sense of identity and warmth in your home. Implementing energy-efficient systems, utilizing renewable materials, and integrating sustainable practices into your home reduce your environmental impact and create a healthier, more conscious living space.",
        button:"Show details"
    },
    

     {
        id:2,
        tag:"realestate",
        img:Blog2img,
        title:"A one-story house with a garden and pool",
        slug: "A-one-story-house-with-a-garden-and-pool",
        para:"Single-Story Bliss, a delightful residence offering the perfect combination of comfort, relaxation, and outdoor enjoyment. This one-story house boasts a beautiful garden retreat and a refreshing pool, creating a haven of serenity and leisure. As you enter the home, you'll immediately notice the open and inviting layout that seamlessly connects the indoor and outdoor spaces. The single-story design ensures easy accessibility and a seamless flow throughout the house, making it ideal for individuals and families alike. The living area exudes warmth and comfort, providing a cozy space to unwind and spend quality time with loved ones. Large windows allow natural light to fill the room, creating an airy and inviting atmosphere. The layout is designed to maximize functionality and create a sense of spaciousness, making it perfect for relaxation or entertaining guests. Adjacent to the living area, you'll find a well-appointed kitchen, equipped with modern appliances and ample storage. Whether you're a culinary enthusiast or simply enjoy preparing meals, this kitchen provides a functional and stylish space to unleash your creativity. The meticulously landscaped garden offers a peaceful retreat where you can reconnect with nature, indulge in gardening hobbies, or simply bask in the beauty of the outdoors. Imagine enjoying a morning cup of coffee surrounded by vibrant flowers or hosting alfresco dinners amidst the gentle breeze and fragrant blooms. Whether you're lounging by the poolside with a good book or hosting poolside gatherings with friends and family, this outdoor amenity provides endless opportunities for fun, relaxation, and rejuvenation.",
        button:"Show details"
    },
    

     {
        id:3,
        tag:"realestate",
        img:Blog3img,
        title:"A modern double house in the quiet of the forest",
        slug: "A-modern-double-house-in-the-quiet-of-the-forest",
        para:"Forest Haven, a remarkable retreat nestled amidst the serene beauty of the forest. This modern double house offers a unique blend of contemporary design, tranquility, and seamless integration with nature. Set in a quiet and picturesque location, it presents an ideal escape from the bustling world, providing a peaceful sanctuary in the heart of the woodlands. As you approach Forest Haven, you'll be greeted by a striking façade that harmoniously combines clean lines, large windows, and natural materials, blending the house seamlessly into its surroundings. The thoughtful design ensures that every room captures stunning forest views, creating a sense of tranquility and harmony with nature. Step inside and be welcomed into an open-concept living space bathed in natural light. The interior showcases modern finishes, high ceilings, and a minimalist aesthetic that complements the natural beauty outside. The spacious living area seamlessly connects to the dining space and a sleek gourmet kitchen, complete with top-of-the-line appliances, ample storage, and a breakfast bar, making it perfect for both everyday living and entertaining guests. The double house layout offers flexibility and privacy, making it ideal for extended families or those seeking a separate space for work or hobbies. With multiple bedrooms and bathrooms distributed across the two units, there is ample room for personalization and comfortable living. Each bedroom is carefully designed to provide a peaceful retreat, allowing you to wake up to the gentle sounds of the forest and start your day in harmony with nature. The highlight of Forest Haven is its connection to the surrounding woodland. Step out onto the expansive outdoor deck, surrounded by towering trees, and embrace the tranquility of your private oasis.",
        button:"Show details"
    },
    

     {
        id:4,
        tag:"realestate",
        img:Blog4img,
        title:"A modern home in the comfort of San Francisco",
        slug: "A-modern-home-in-the-comfort-of-San-Francisco",
        para:"a contemporary residence offering the perfect blend of modern design and the comforts of San Francisco living. Nestled in the heart of this vibrant city, this exceptional home provides a sanctuary of style, sophistication, and convenience. As you step inside, you'll be greeted by an open and airy living space adorned with sleek lines, premium finishes, and an abundance of natural light. The modern architecture seamlessly integrates with the surrounding urban landscape, creating a harmonious connection between indoor and outdoor living. The living area is designed for both relaxation and entertaining, with ample room for lounging and gathering with friends and family. Large windows frame stunning city views, allowing you to immerse yourself in the dynamic energy of San Francisco. Whether you're unwinding after a long day or hosting a soirée, this space provides the perfect backdrop. The gourmet kitchen is a culinary enthusiast's dream, equipped with state-of-the-art appliances, ample counter space, and stylish cabinetry. Prepare delicious meals while soaking in the cityscape, and enjoy casual dining at the breakfast bar or gather in the adjacent dining area for more formal occasions. The bedrooms in this modern home are thoughtfully designed havens of relaxation. Retreat to your private sanctuary and unwind amidst the tranquility. Wake up to breathtaking views of the city or savor a morning coffee on your balcony, taking in the sights and sounds of San Francisco awakening. Oasis is its prime location. Situated in the heart of San Francisco, you'll have easy access to the city's renowned attractions, cultural landmarks, dining hotspots, and vibrant neighborhoods.",
        button:"Show details"
    },


     {
        id:5,
        tag:"realestate",
        img:Blog5img,
        title:"2 storey villa with sea access",
         slug: "A-modern-home-in-the-comfort-of-San-Francisco",
        para:"Seaside Serenity, where luxury meets coastal living in this stunning 2-storey villa with direct access to the sparkling sea. Nestled in a prime location, this extraordinary property offers unparalleled views, privacy, and a lifestyle that embraces the tranquility of the ocean. Upon entering the villa, you are greeted by an elegant foyer that leads to the spacious and open living area. Floor-to-ceiling windows allow natural light to flood the space while providing breathtaking vistas of the azure waters. The living room seamlessly flows into a gourmet kitchen, fully equipped with state-of-the-art appliances, sleek countertops, and ample storage for culinary enthusiasts. The villa boasts multiple bedrooms, each designed to provide a private sanctuary with panoramic sea views. Wake up to the gentle sounds of waves crashing and indulge in the ultimate relaxation. The master suite, a haven of luxury, features a private balcony, a lavish en-suite bathroom with a soaking tub, and a walk-in closet. Step outside onto the expansive terrace, where a world of leisure and entertainment awaits. Lounge by the infinity pool, bask in the sun, or host unforgettable gatherings against the backdrop of the mesmerizing seascape. The outdoor area also includes a shaded dining space and a built-in barbecue, perfect for al fresco dining while enjoying the sea breeze. One of the most remarkable features of this villa is its direct access to the pristine beach. A private pathway leads you from the property directly to the sandy shoreline, where you can indulge in swimming, sunbathing, and various water activities at your leisure.",
        
    },


]


console.log(blogData)

export default blogData;