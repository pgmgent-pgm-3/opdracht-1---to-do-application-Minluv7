/**
 * A home controller
 */
import DataSource from "../lib/DataSource.js";

//import data from "../data/data.js";

export const home = async (req, res) => {
  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");
  

  const categorieData = await categorieRepo.find({
    where: {
      user: {
        id: req.user.id
      }
    }
  });
  const todoData = await todoRepo.findOneBy({ id: null });
 

  res.render("home", {
    nav_items: categorieData,
    todoData,
    user: req.user,
  });
};

export const categoryTodos = async (req, res) => {
  // get the id with destructuring
  const { id } = req.params;

  const todoRepo = DataSource.getRepository("Todo");
  const categorieRepo = DataSource.getRepository("Categorie");

const categorieData = await categorieRepo.find({
  where: {
    user:{
      id: req.user.id
      }
  }
});

  console.log(categorieData);

  const allTodosFromCategory = await todoRepo.find({
    where: {
      "owner.id": id,
      user:{
        id: req.user.id
        }
    }
  });

  // const userRepo = DataSource.getRepository("User");

  // const allTodos = await userRepo.find({
  //   where: {
  //     "user.id": id,
  //   },
  // });

  //const todoData = await todoRepo.findOneBy({ id: 1 });

  res.render("home", {
    nav_items: categorieData,
    allTodosFromCategory,
    user: req.user,
  });
};
