import BackeryItem from '../models/BakeryItem.js'

export const getData = async(req,res) =>{
    try {
        // Fetch all bakery items from the database
        const bakeryItems = await BackeryItem.find();
        console.log('Bakery Items:', bakeryItems);
        res.status(200).json(bakeryItems);
    } catch (error) {
        console.error('Error fetching bakery items:', error);
        res.status(500).json({ message: 'Error fetching bakery items' });
    }
}

export const postData = async(req,res) =>{
    try {
        const { nuts, soda,flour,sugar,oil} = req.body;
        const id = "661f6485f046162f45d5d0f3"
        const existingItem = await BackeryItem.findById(id);
        console.log(existingItem)
        if (!existingItem) {
            return res.status(404).json({ message: 'Bakery item not found' });
        }
        existingItem.nuts -= nuts;
        existingItem.soda -= soda;
        existingItem.flour -= flour;
        existingItem.sugar -= sugar;
       
       existingItem.oil -= oil;
       
        const savedItem = await existingItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error creating bakery item:', error);
        res.status(500).json({ message: 'Error creating bakery item' });
    }
}

export const setData = async(req,res) =>{
    try {
        const { star, square, triangle, circle } = req.body;
       
        if (!star || !square || !triangle || !circle) {
            return res.status(400).json({ message: 'One or more cookie types are missing from the request' });
        }

        let totalNuts = 0;
        let totalSoda = 0;
        let totalFlour = 0;
        let totalOil = 0;
        let totalSugar = 0;

        [star, square, triangle, circle].forEach(cookie => {
            totalNuts += cookie.nuts || 0;
            totalSoda += cookie.soda || 0;
            totalFlour += cookie.flour || 0;
            totalOil += cookie.oil || 0;
            totalSugar += cookie.sugar || 0;
        });

        if (isNaN(totalNuts) || isNaN(totalSoda) || isNaN(totalFlour) || isNaN(totalSugar) || isNaN(totalOil)) {
            return res.status(400).json({ message: 'One or more ingredient values are not valid numbers' });
        }

        existingItem.nuts -= totalNuts;
        existingItem.soda -= totalSoda;
        existingItem.flour -= totalFlour;
        existingItem.sugar -= totalSugar;
       
         existingItem.oil -= totalOil;
       
         const savedItem = await existingItem.save();
         res.status(201).json(savedItem);
        console.log('Combined ingredient values:', { nuts: totalNuts, soda: totalSoda, flour: totalFlour, oil: totalOil, sugar: totalSugar });

        res.status(200).json({ message: 'Ingredients updated successfully' });
    } catch (error) {
        console.error('Error updating ingredients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateData = async(req,res) =>{
    try{
        const {nuts,soda,flour,sugar,oil}=req.body;
        const id = "661f6485f046162f45d5d0f3"
        const existingItem = await BakeryItem.findById(id);
        console.log(existingItem)

        if (!existingItem) {
            return res.status(404).json({ message: 'Bakery item not found' });
        }
        existingItem.nuts=nuts;
        existingItem.soda=soda;
        existingItem.flour=flour;
        existingItem.sugar=sugar;
        existingItem.oil=oil;

        const savedItem=await existingItem.save();
        res.status(201).json(savedItem);
    }catch (error) {
        console.error('Error in setting ingredients to 0:', error);
        res.status(500).json({ message: 'Error creating bakery item' });
    }
}