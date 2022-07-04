import PostModel from '../models/posts.js';
import RepliesModel from '../models/replies.js';
import UsersModel from '../models/users.js';


export const getPosts = async (req, res) => {
  try {
    PostModel.find({ status: "true" }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByID = async (req, res) => {
  try {
    // const post = await PostModel.find({ _id: req.params.id }).populate('user').populate('tag');
    // const reply = await RepliesModel.find({ post: req.params.id }).populate('user').populate('post');
    // const inforPost = [...post, { 'reply': reply }]
    // res.status(200).json(inforPost);
    PostModel.find({ _id: req.params.id }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByTitle = async (req, res) => {
  try {
    const post = await PostModel.find({ title: req.body.title })
    res.status(200).json(post[0]._id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByUserId = async (req, res) => {
  try {
    await PostModel.find({ user: req.params.idUser }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByAdmin = async (req, res) => {
  try {
    await PostModel.find({ category: "admin", type: "notification" }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByJob = async (req, res) => {
  try {
    await PostModel.find({ category: "admin", type: "job" }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByStudentQuestion = async (req, res) => {
  try {
    const dateNow = new Date().toISOString().split('T')[0];
    await PostModel.find({ type: "question", status: "true" }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        const dataFilter = data.filter(item => new Date(item.createdAt).toISOString().split('T')[0] !== dateNow)
        res.status(200).json(dataFilter);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByStudentShare = async (req, res) => {
  try {
    const dateNow = new Date().toISOString().split('T')[0];
    await PostModel.find({ type: "share", status: "true" }).sort('-createdAt')
      .populate('tag')
      .populate('user')
      .then(data => {
        const dataFilter = data.filter(item => new Date(item.createdAt).toISOString().split('T')[0] !== dateNow)
        res.status(200).json(dataFilter);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByTrending = async (req, res) => {
  try {
    const monthNow = new Date().getMonth();
    const yearNow = new Date().getFullYear();
    const post = await PostModel.find({ category: "student", status: "true" }).sort('-createdAt')
      .populate('user')
      .populate('tag');
    const postfilterDay = post.filter(item => (new Date(item.createdAt).getMonth() == monthNow + 1) || (new Date(item.createdAt).getFullYear() == yearNow))
    const sort = postfilterDay.sort(function (item1, item2) {
      return item2.view.length - item1.view.length;
    });
    res.status(200).json(sort);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const postByShareNewest = async (req, res) => {
  try {
    const dateNow = new Date().toISOString().split('T')[0];
    const post = await PostModel.find({ type: "share", status: "true" }).sort('-createdAt').populate('user').populate('tag');
    const postFilter = await (post.filter(item => new Date(item.createdAt).toISOString().split('T')[0] === dateNow))
    res.status(200).json(postFilter);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByTag = async (req, res) => {
  try {
    const posts = []
    const post = await PostModel.find({ type: req.body.type, status: "true" }).sort('-createdAt')
      .populate('user')
      .populate('tag')
    post.forEach(x => {
      x.tag.forEach(y => {
        if (String(y._id) === req.body.idTag) {
          posts.push(x)
        }
      })
    })
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
export const postByTags = async (req, res) => {
  try {
    const postDetail = await PostModel.findById(req.params.id)
      .populate('user')
      .populate('tag')
    const listPost = []
    const tags = findDetail.tag
    const posts = await PostModel.find({ status: "true" }).sort('-createdAt')
      .populate('user')
      .populate('tag')
    tags.map(item => {
      posts.map(item2 => {
        item2.tag.map(item3 => {
          if (item3.name === item.name) {
            listPost.push(item2)
          }
        })
      })
    })
    res.status(200).json(unique(listPost));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postByQuestionNewest = async (req, res) => {
  try {
    const dateNow = new Date().toISOString().split('T')[0];
    const post = await PostModel.find({ type: "question", status: "true" }).sort('-createdAt').populate('user').populate('tag').limit(5);
    const postFilter = await (post.filter(b => new Date(b.createdAt).toISOString().split('T')[0] === dateNow))
    res.status(200).json(postFilter);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById({ _id: req.params.id });
    const item = {
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      type: req.body.type,
      status: true,
      category: post.categoty,
      user: post.user,
      isFinish: false,
      view: post.view,
      vote: post.vote
    }
    const newPost = await PostModel.findOneAndUpdate({ _id: req.params.id }, item, {
      new: true,
    });
    res.status(200).json(newPost)
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateAllPost = async (req, res) => {
  try {
    const post = await PostModel.updateMany({}, {
      $set: {
        vote: [{
          user: "618b86c24cb0937ae66a8395",
          direction: "increment",
          score: 1
        }]
      }
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePost = async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.id);
    post.remove();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const findPosts = async (req, res) => {
  try {
    const post = req.body;
    if (post.category && post.type) {
      await PostModel.find({ type: post.type, category: post.category, status: post.status }).sort('-createdAt')
        .populate('tag')
        .populate('user')
        .then(data => {
          res.status(200).json(data);
        })
    } else {
      await PostModel.find({ status: post.status })
        .populate('tag')
        .populate('user')
        .then(data => {
          res.status(200).json(data);
        })
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPostsBookmark = async (req, res) => {
  try {
    const posts = [];
    const user = await UsersModel.findById({ _id: req.params.idUser });
    const post = await PostModel.find({ status: "true" })
      .populate('user')
      .populate('tag')
    await user.bookmark.forEach(bmid => {
      post.forEach(item => {
        if (String(item._id) === bmid) {
          posts.push(item)
        }
      });
    })
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "bla" });
  }
};

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}
export const handleVotePost = async (req, res) => {
  try {

    //const newVote = []
    const post = await PostModel.findById(req.params.id).populate('tag')
      .populate('user');
    const newVote = post.vote.filter(item => (item.user !== req.body.user))
    newVote.push(req.body)
    const newPost = {
      title: post.title,
      content: post.content,
      user: post.user,
      tag: post.tag,
      type: post.type,
      status: post.status,
      view: post.view,
      vote: newVote,
      createdAt: post.createdAt
    }
    await PostModel.findOneAndUpdate({ _id: post._id }, newPost, {
      new: true,
    });
    res.status(200).json([newPost]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handleView = async (req, res) => {
  try {
    const isValid = false;
    const post = await PostModel.findById(req.params.id).populate('tag').populate('user');
    await post.view.map(item => {
      if (item === req.body.idUser) {
        isValid = true;
      }
    })
    if (isValid === false) {
      post.view.push(req.body.idUser)
    }
    post.save()
    res.status(200).json("Success");
  } catch (err) {
    res.status(500).json({ error: "bla" });
  }
};
export const addFieldView = async (req, res) => {
  try {
    await PostModel.updateMany({
      $set: { isFinish: true }
    })
  } catch (err) {
    res.status(500).json({ error: "bla" });
  }
};

export const analyzePost = async (req, res) => {
  try {
    const parameter = []
    const posts = await PostModel.find()
    const type = ["share", "question", "job", "notification"]
    type.map(item => {
      const itemFilter = posts.filter(item2 => item2.type === item);
      const item3 = {
        name: item,
        value: itemFilter.length
      }
      parameter.push(item3)
    })
    res.status(200).json(parameter);

  } catch (err) {
    res.status(500).json({ error: "bla" });
  }
};

export const analyzePostPerMonth = async (req, res) => {
  try {
    const parameter = []
    const type = ["share", "question", "job", "notification"]
    const posts = await PostModel.find()
    const yearFilter = posts.filter(item => new Date(item.createdAt).getFullYear() === Number(req.body.year))
    const currentMonth = new Date().getMonth();
    if (Number(req.body.year) === new Date().getFullYear()) {
      for (let i = 0; i <= currentMonth; i++) {
        const monthFilter = yearFilter.filter(item => new Date(item.createdAt).getMonth() === i)
        const item3 = {
          name: i,
          share: 0,
          job: 0,
          notification: 0,
        }
        type.map(item => {
          const itemFilter = monthFilter.filter(item2 => item2.type === item);
          if (item === "share") {
            item3.share = itemFilter.length
          }
          if (item === "question") {
            item3.question = itemFilter.length
          }
          if (item === "job") {
            item3.job = itemFilter.length
          }
          if (item === "notification") {
            item3.notification = itemFilter.length
          }
        })
        parameter.push(item3)
      }
    } else if (Number(req.body.year) < new Date().getFullYear()) {
      for (let i = 0; i <= 11; i++) {
        const monthFilter = yearFilter.filter(item => new Date(item.createdAt).getMonth() === i)
        const item3 = {
          name: i,
          share: 0,
          job: 0,
          notification: 0,
        }
        type.map(item => {
          const itemFilter = monthFilter.filter(item2 => item2.type === item);
          if (item === "share") {
            item3.share = itemFilter.length
          }
          if (item === "question") {
            item3.question = itemFilter.length
          }
          if (item === "job") {
            item3.job = itemFilter.length
          }
          if (item === "notification") {
            item3.notification = itemFilter.length
          }
        })
        parameter.push(item3)
      }
    }
    res.status(200).json(parameter);
  } catch (err) {
    res.status(500).json({ error: "bla" });
  }
};

export const handleIsFinish = async (req, res) => {
  try {
    const post = await PostModel.findOneAndUpdate({ _id: req.params.id }, { isFinish: req.body.status }, {
      new: true,
    }).populate('tag').populate('user');
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};