/**
 * @api {GET} /inspections/read Read inspection.
 * @apiName InspectionAPI_read
 * @apiGroup User Application
 *
 * @apiParam {Number} limit limit the result number by default is 10
 * @apiParam {String} idRestaurant add filter by idRestaurant
 * @apiParam {String} idInspection add filter by idInspection
 * @apiParam {String} date add filter by year
 * @apiParam {String} type add filter by cook type
 * @apiParam {String} name add filter by restaurant name
 * @apiParam {String} borough add filter by borough
 * @apiParam {Number} score sort the result in term of the score and order given in param
 *
 * @apiExample request example
 *             /inspections?limit=2&date=2013
 *
 * @apiSuccess {Object} _id id inspection
 * @apiSuccess {String} idRestaurant id restaurant inspected
 * @apiSuccess {Object} restaurant information about the restaurant inspected
 * @apiSuccess {String} inspectionDate inspected date
 * @apiSuccess {String} violationCode code violation
 * @apiSuccess {String} violationDescription description of the violation
 * @apiSuccess {Number} score inspection score
 * @apiSuccess {String} grade marks avualuting the inspection
 *
 */


/**
 * @api {GET} /inspections/verify Verify restaurant already saved in the database.
 * @apiName InspectionAPI_verify
 * @apiGroup User Application
 *
 * @apiParam {Number} zipcode the restaurant zipcode
 * @apiParam {Number} phone the restaurant phone number
 *
 * @apiExample request example
 *             /inspections/verify?phone=2129829166&zipcode=10003
 *
 * @apiSuccess {Boolean} found give information if the restaurant exist
 * @apiSuccess {Object} restaurant return information about the restaurant
 * @apiSuccess {Object} idRestautnat return the id resaurant
 *
 */

 /**
  * @api {GET} /inspections/stats Give some stats for a restaurant given
  * @apiName InspectionAPI_stats
  * @apiGroup User Application
  *
  * @apiParam {Number} idRestaurant the restaurant id
  *
  * @apiExample request example
  *             /inspections/stats?idRestaurant=41217775
  *
  * @apiSuccess {Number} avgScore Average score received
  * @apiSuccess {Number} scoreMax Score max received
  * @apiSuccess {Number} numberInspec number inspections
  * @apiSuccess {Number} avgPerYear Average score per year
  *
  */



/**
 * @api {POST} /inspections/add add inspection.
 * @apiName InspectionAPI_add
 * @apiGroup Admin User Application
 *
 * @apiHeader {Content-Type} application/json
 * @apiParam {Object} InformationInspection (need to be add in the body)
 *
 *
 * @apiExample request example
 *         endpoint: /inspections/add
 *         header : Content-Type:application/json
 *
 *         body:
 *          {
            "idRestaurant": 00,
            "restaurant": {
              "name": "XXX",
              "borough": "XXX",
              "buildingnum": "000",
              "street": "XXX",
              "zipcode": "00",
              "phone": "00",
              "cuisineType": "XXX"
            },
            "inspectionDate": "XXX",
            "violationCode": "XXX",
            "violationDescription": "XXX",
            "criticalFlag": "XXX",
            "score": 00,
            "grade": "XXX"
          }
 *
 * @apiSuccess{String} Response element added
 *
 */
