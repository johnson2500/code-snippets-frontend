import moment from 'moment';

export default
{
  id: 2,
  name: "First Todo",
  todoItems: [{
    id: 1,
    title: "First todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool"],
  }, {
    id: 2,
    title: "Second todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool"],
  }, {
    id: 3,
    title: "Third todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool"],
  }, {
    id: 4,
    title: "Fourth todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool", "Beans"],
  }, {
    id: 5,
    title: "Fith todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool"],
  }, {
    id: 6,
    title: "Sixth todo item.",
    dueDate: moment().subtract(10, 'days').calendar(),
    description: "This is the first item",
    tags: ["cool"],
  }],
};
