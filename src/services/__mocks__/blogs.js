const notes = [
{
	title: "Katti matikaisen happotekno blogi",
	author: "Katti M",
	url: "katti.com",
	likes: 0,
	user: {
		username: "eino",
		name: "eino vuorinen",
		id: "5ddec53ccc8d5d1b54cfea89"
	},
	id: "5de646e98658123934438039"
},
{
	title: "Joululaulublogi",
	author: "olkkarin spedet",
	url: "joulu.net",
	likes: 0,
	user: {
		username: "eino",
		name: "eino vuorinen",
		id: "5ddec53ccc8d5d1b54cfea89"
	},
	id: "5de6657a397a5a3980c35b4c"
},
{
	title: "Kuinka olla käyttämättä 808 bassoa",
	author: "Kaija koo",
	url: "kaija.com",
	likes: 0,
	user: {
		username: "eino",
		name: "eino vuorinen",
		id: "5ddec53ccc8d5d1b54cfea89"
	},
	id: "5de665a2397a5a3980c35b4d"
}
]
const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }