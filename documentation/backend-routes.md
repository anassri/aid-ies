## HTML
* GET / staticPagesController#root

## API Endpoints

### users
* GET /api/users/:id - returns profile, list of favorites, list of created campaigns
* POST /api/users - sign up

### session
* POST /api/session - log in
* DELETE /api/session - log out

### campaigns
* GET /api/campaigns - returns list of campaigns
* POST /api/campaigns - creates new campaign
* GET /api/campaigns/:id - returns campaign detail
* PUT /api/campaigns/:id - edits existing campaign
* DELETE /api/campaigns/:id - deletes existing campaign

### favorites
* POST /api/campaigns/:id/favorites - favorites a campaign
* DELETE /api/campaigns/:id/favorites - removes a favorite