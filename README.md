# EVE Stats

A project for collecting public-facing stats for the game EVE Online and making pretty graphs from them.

## Useful API endpoints

```
https://zkillboard.com/api/kills/regionID/{regionID}/page/{page#}/
```
e.g. https://zkillboard.com/api/kills/regionID/12000001/page/40/

regionID: 12000001, 12000002, 12000003, 12000004, 12000005

page#: 1-40 (for at least region 12000001)


```
https://esi.tech.ccp.is/v3/universe/types/{typeId}/
```
e.g.: https://esi.tech.ccp.is/v3/universe/types/670/
