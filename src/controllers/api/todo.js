import DataSource from "../../lib/DataSource.js";

export const getTodo = async (req, res, next) => {
  try {
    const todoRepository = DataSource.getRepository("Todo");
    const todos = await todoRepository.find();

    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
    });
  }
};

export const postTodo = async (req, res, next) => {
  try {
    // save todo to the database
    const todoRepository = await DataSource.getRepository("Todo");

    // get existing Todo (if there is one...)
    const todos = await todoRepository.findOneBy({
      name: req.body.name,
      done: req.body.done,
    });

    // if we have an Todo, return the existing one
    if (todos) {
      res.status(200).json({
        status: "Interest already exists in database",
      });
    } else {
      // if the Todo does not exist... create a new one in the database!
      await todoRepository.save({
        ...req.body,
        ownerId: {
          name: "",
        },
      });

      // let the client know that we added an entry
      res.status(201).json({
        status: "We create a new interest in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
      //   error: e.messege,
    });
  }
};

export const postCategoryTodo = async (req, res, next) => {
  try {
    console.log(req.body);
    // save todo to the database
    const todoRepository = await DataSource.getRepository("Todo");
    const categorieRepository = await DataSource.getRepository("Categorie");
    // get existing Todo (if there is one...)
    const todos = await todoRepository.findOneBy({
      name: req.body.name,
      done: req.body.done,
    });

    const categorie = await categorieRepository.findOneBy({
      name: req.body.name,
    });

    // if we have an Todo, return the existing one
    if ((todos, categorie)) {
      res.status(200).json({
        status: "todo already exists in database",
      });
    } else {
      // if the Todo does not exist... create a new one in the database!
      await todoRepository.save({
        ...req.body,
        owner: {
          name: "",
          done: "",
        },
      });
      await categorieRepository.save({
        ...req.body,
        todo: {
          name: "",
        },
      });

      // let the client know that we added an entry
      res.status(201).json({
        status: "We create a new todo in the database!",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
      error: e.messege,
    });
    console.log(e);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    // get the id with destructuring
    const { id } = req.params;
    // zoek de todo op in de database
    const todoRepository = DataSource.getRepository("Todo");
    // get the todo with a specific id
    const todos = await todoRepository.findOneBy({ id });

    // does the todo exist?
    if (todos) {
      // remove the todo
      const deleteTodo = await todoRepository.delete(todos);
      res.render(deleteTodo);
    }
    console.log("deleteTodo");
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

export const updateTodo = async (req, res, next) => {
  try {
    const todoRepository = DataSource.getRepository("Todo");
    const todos = await todoRepository.findOneBy({ id: req.body.id });

    // change the name of the user
    // user.name = req.body.name;
    const newTodos = {
      ...todos,
      ...req.body,
    };

    // save the data in the database
    await todoRepository.save(newTodos);

    // give a response to the client
    res.status(200).json(newTodos);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!" + e.message,
    });
  }
};
