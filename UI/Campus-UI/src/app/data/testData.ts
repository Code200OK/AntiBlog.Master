import { Priority } from '../model/priority';
import { Task } from '../model/task';
import { Category } from '../model/category';
import { Status } from '../model/status';

export class TestData {

  static statuses: Status[] = [
    { id: 1, title: 'Active', completed: false },
    { id: 2, title: 'In progress', completed: false },
    { id: 3, title: 'Closed', completed: true }
  ];

  static priorities: Priority[] = [
    { id: 1, title: 'High', color: '#ED5C46'},
    { id: 2, title: 'Medium', color: '#FFAD31'},
    { id: 3, title: 'Low', color: '#5FD278'},
  ];

  static categories: Category[] = [
    { id: 1, title: 'Eduction'},
    { id: 2, title: 'Coding'},
    { id: 3, title: 'Other'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'Learn english',
      priority: TestData.priorities[0],
      // completed: false,
      status: TestData.statuses[0],
      date: new Date('2020-05-29'),
      category: TestData.categories[0]
    },

    {
      id: 2,
      title: 'Call mc Petya and give thanks for motivation',
      priority: TestData.priorities[1],
      // completed: true,
      status: TestData.statuses[2],
      date: new Date('2020-06-1'),
      category: TestData.categories[0]
    },
    {
      id: 3,
      title: 'Buy computer new album MC Petya',
      priority: TestData.priorities[1],
      // completed: false,
      status: TestData.statuses[0],
      date: new Date('2020-06-7'),
      category: TestData.categories[1]
    },

    {
      id: 4,
      title: 'Press F to pay respect',
      priority: TestData.priorities[2],
      // completed: false,
      status: TestData.statuses[0],
      date: new Date('2020-06-20')
    },
  ];

}

