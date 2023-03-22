import DataSource from "../lib/DataSource.js";


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
    const todos = await todoRepository.findOne({
     where: {
      name: req.body.name,
      owner:{
        id: req.body.category
      },
      user: {
        id: req.user.id
      }
     }
    });
    // if we have an Todo, return the existing one
    if (todos) {
      res.status(200).json(res.redirect("/"));
    } else {
      // if the Todo does not exist... create a new one in the database!
      await todoRepository.save({
        name: req.body.name,
        owner: {
          id: req.body.category
        },
        user: {
          id: req.user.id
        }
      });
      // let the client know that we added an entry
      //res.redirect zorgt ervoor dat je in home blijft
      res.status(201).json(res.redirect("/"));
    }
  } catch (e) {
    res.status(500).json({error: e.messege,
    });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    // get the id with destructuring
    const { id } = req.params;
    // zoek de todo op in de database
    const todoRepository = DataSource.getRepository("Todo");
    // get the todo with a specific id
    const todos = await todoRepository.findOne({ where: {
      id: id
    },  relations: ['owner']});

    // does the todo exist?
    if (todos) {
      // remove the todo
      await todoRepository.delete(todos);
    }
    res.redirect('/category/' + todos.owner.id);
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!",
      message: e.message
    });
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoRepository = DataSource.getRepository("Todo");
    const todos = await todoRepository.findOne(
    {where:{
      id: id,
      name: req.body.name,
  },
        
  })
    console.log(todos)
    
    const newTodos = {
      ...todos,
      ...req.body,
     
    };


    // save the data in the database
    await todoRepository.save(newTodos,    
      {where:{
        id: id,
        name: req.body.name},
      }
    );

    
    // give a response to the client
    res.status(200).json(res.redirect('/category/' + todos.owner.id));
  } catch (e) {
    res.status(500).json({
      status: "Er liep iets fout!" + e.message,
    });
  }
};
