import DataSource from "../../lib/DataSource.js";

export const getCategories = async (req, res, next) => {
  try {
    const categorieRepository = DataSource.getRepository("Categorie");
    const categories = await categorieRepository.find();

    // const interest = interests.filter((interest) => interest.id === 1);
    // console.log('interest with id 1', interest.pop());

    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};
