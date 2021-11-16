const router = require("express").Router();
const Celebrity = require("../models/celebrity");

// router.get("/celebrities", (req, res, next) => {
//   //   retrieve celebrities from db
//   Celebrity.find()
//     .then((celebritiesFromDB) => {
//       // console.log(celebritiesFromDB);
//       // render the view
//       res.render("celebrities/index", { celebrityList: celebritiesFromDB });
//     })
//     .catch((err) => next(err));
//   // res.send('hello')
// });

router.get('/celebrities/add', (req, res, next) => {
  res.render('celebrities/add');
});

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render('celebrities/show', { celebrity: celebrityFromDB });
    })
    .catch((err) => next(err));
});

router.post("/celebrities", (req, res, next) => {
  // console.log(req.body)
  // const name = req.body.name
  const { name, occupation, catchPhrase } = req.body;
  // console.log(name, occupation, catchPhrase)

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
  .then((createdCelebrity) => {
    // console.log(createdCelebrity)
    // redirect to the celebrity detail page
    // res.render('celebrities/details', { celebrity: createdCelebrity })
    res.redirect(`/celebrities/${createdCelebrity._id}`);
  });
});

// router.get('/celebrities/edit/:id', (req, res, next) => {
// 	const id = req.params.id
// 	// get the celebrity with this id
// 	Celebrity.findById(id)
// 		.then(celebrityFromDB => {
// 			console.log(celebrityFromDB)
// 			// render a form to edit the celebrity
// 			res.render('celebrities/edit', { celebrity: celebrityFromDB })
// 		})
// 		.catch(err => next(err))
// });

// router.post('/celebrities/edit/:id', (req, res, next) => {
// 	const id = req.params.id
// 	// retrieve the values from the request body
// 	const { name, occupation, catchPhrase } = req.body
// 	// find the book and update
// 	Celebrity.findByIdAndUpdate(id, {
// 		name,
// 		occupation,
// 		catchPhrase
// 	}, { new: true })
// 		.then(updatedCelebrity => {
// 			console.log(updatedCelebrity)
// 			// redirect to the details of the updated book
// 			res.redirect(`/celebrities/${updatedCelebrity._id}`)
// 		})
// 		.catch(err => next(err))
// });

router.post('/celebrities/delete/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findByIdAndDelete(id)
		.then(() => {
			// redirect to the celebrity list
			res.redirect('/celebrities')
		})
		.catch(err => {
			next(err)
		})
});

module.exports = router;
