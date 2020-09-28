### The component organization is as follows:

* Root
    * App
        * NavBar
        * (main component)
        * Footer
        
### The following routes, defined in App, will render components between NavBar and Footer:

* /
    * CampaignIndex
* /login
    * SessionForm
* /signup
    * SessionForm
* /users/:userId
    * Profile
    * UserFavorites
    * UserCampaigns
* /campaigns/:campaignId
    * CampaignDetail
* /campaigns/:campaidId/edit
    * CampaignEditForm 
* /campaigns/create
    * NewCampaignForm
