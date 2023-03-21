import DataSource from "../../lib/DataSource.js";

export const getCategories = async (req, res, next) => {
  try {
    const categorieRepository = DataSource.getRepository("Categorie");
    const categories = await categorieRepository.find(
      
    );
   
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};

export const postCategories = async (req, res, next) => {
  try {
    const categorieRepository = DataSource.getRepository("Categorie");

    // get existing Todo (if there is one...)
    const categories = await categorieRepository.findOneBy({
      name: req.body.name,
    });

    // if we have an Todo, return the existing one
    if (categories) {
      res.status(200).json({
        status: "categorie already exists in database",
      });
    } else {
      // if the Todo does not exist... create a new one in the database!
      await categorieRepository.save(req.body);

      // let the client know that we added an entry
      res.status(201).json({
        status: "We create a new interest in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
      // error: e.messege,
    });
  }
};

export const deleteCategories = async (req, res, next) => {
  try {
    // get the id with destructuring
    const { id } = req.params;
    // get the user repository
    const categorieRepository = DataSource.getRepository("Categorie");

    // get the user with a specific id
    const categories = await categorieRepository.findOneBy({ id });

    // does the user exist?
    if (categories) {
      // remove the user
      await categorieRepository.delete(categories);
    }

    // send a response
    res.status(204).json({
      status: "We deleted the record in the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};

export const updateCategories = async (req, res, next) => {
  try {
    const categorieRepository = DataSource.getRepository("Categorie");
    const categories = await categorieRepository.findOneBy({ id: req.body.id });

    // change the name of the user
    // user.name = req.body.name;
    const newCategories = {
      ...categories,
      ...req.body,
    };

    // save the data in the database
    await categorieRepository.save(newCategories);

    // give a response to the client
    res.status(200).json(newCategories);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!" + e.message,
    });
  }
};
