import { TechCategoryModel } from "../Model/TechCategoryModel";

export const addTechCategory = async()=>{
  try{
    const {name} = req.body;
    const techCategory = new TechCategoryModel(name);
    await techCategory.save()
    return res.status(200).json({ message: "Tech Category added successfully!", techCategory });
  }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTechCategory = async()=>{
    try{
      const {id} = req.params;
      const {name} = req.body;
      const techCategory = await TechCategoryModel.findById(id)
      techCategory.name = name || techCategory.name
      await techCategory.save()
    return res.status(200).json({ message: "Tech Category updated successfully!", techCategory });
    }catch (error) {
          return res.status(500).json({ message: error.message });
      }
  }

export const getTechCategories = async()=>{
    try{
        const techCategories = await TechCategoryModel.find();
    return res.status(200).json({ message: "Tech Categories getting!", techCategories });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteTechCategory = async()=>{
    try{
      const {id} = req.params;
      const techCategory = await TechCategoryModel.findById(id)
      if(!techCategory){
        res.status(404).json({ message: "This tech category does not exist!" });
      }
      await TechCategoryModel.findByIdAndDelete(id)
    return res.status(200).json({ message: "Tech Category deleted successfully!"});
    }catch (error) {
          return res.status(500).json({ message: error.message });
      }
  }