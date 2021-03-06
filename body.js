import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict'; 

import { Tasks } from '../api/tasks.js';

import './body.html';

import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


 
 Template.body.helpers({
  tasks() {

    
    // Otherwise, return all of the tasks
    
   // Show newest tasks at the top
  return Tasks.find({}, { sort: { createdAt: -1 } });

  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});




    