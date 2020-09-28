```js
{
   users: {
       1:{
           id: 1,
           first_name: "user1_firstname",
           last_name: "user1_lastname",
           email: "user1@email.com",
           bio: "Contributor bio",
           website: "http://website.com",
           instagram: "http://instagram.com/user1",
           facebook: "http://facebook.com/user1",
       },
       2:{
           id: 2,
           first_name: "user2_firstname",
           last_name: "user2_lastname",
           email: "user2@email.com",
           bio: "Contributor bio",
           website: "http://website.com",
           instagram: "http://instagram.com/user2",
           facebook: "http://facebook.com/user2",
       },
       3:{
           id: 3,
           first_name: "user3_firstname",
           last_name: "user3_lastname",
           email: "user3@email.com",
           bio: "Contributor bio",
           website: "http://website.com",
           instagram: "http://instagram.com/user3",
           facebook: "http://facebook.com/user3",
       },
   },
   campaigns: {
       1: {
           id: 1,
           name: "campaign_name1",
           summary: "this is a quick summary",
           image: "/public/images/campaign_1.jpg",
           story: "This a nice campaign, with a great charity",
           bid: "5",
           closing_date: "2021-08-09 07:42:28",
           location: 'Atlanta, GA',
           userId: 1,
           charityId: 1,
           categoryId: 1,
       },
       2: {
           id: 2,
           name: "campaign_name2",
           summary: "this is a quick summary",
           image: "/public/images/campaign_2.jpg",
           story: "This a nice campaign, with a great charity",
           bid: "5",
           closing_date: "2021-08-09 07:42:28",
           location: 'Atlanta, GA',
           userId: 2,
           charityId: 2,
           categoryId: 2,
       },
       3: {
           id: 3,
           name: "campaign_name3",
           summary: "this is a quick summary",
           image: "/public/images/campaign_3.jpg",
           story: "This a nice campaign, with a great charity",
           bid: "5",
           closing_date: "2021-08-09 07:42:28",
           location: 'Atlanta, GA',
           userId: 3,
           charityId: 3,
           categoryId: 3,
       },
   },
   charities: {
       1: {
           id: 1,
           name: "awesome charity1",
           bio: "awesome charity bio",
           wesbite: "http://website.com",
       },
       2: {
           id: 2,
           name: "awesome charity2",
           bio: "awesome charity bio",
           wesbite: "http://website.com",
       },
       3: {
           id: 3,
           name: "awesome charity3",
           bio: "awesome charity bio",
           wesbite: "http://website.com",
       },
   },
   categories: {
       1: {
           id:1,
           name: "Paintings",
       },
       2: {
           id:2,
           name: "Sculptures",
       },
       3: {
           id:3,
           name: "Comics",
       },
       4: {
           id:4,
           name: "Crafts",
       },
       5: {
           id:5,
           name: "Clothings",
       },
   },
   favorites: {
       1:{
           id: 1,
           userId: 1,
           campaignId: 1
       },
       2:{
           id: 2,
           userId: 2,
           campaignId: 2
       },
       3:{
           id: 3,
           userId: 3,
           campaignId: 3
       },
   },
   session: {
       id: 1
   },
   errors: {
       session: [],
   },
}
```