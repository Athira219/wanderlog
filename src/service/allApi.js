import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"


//----------------REGISTER---------------//
export const wanderRegister = (reqBody) => {
  return commonApi('POST', `${baseUrl}/wanderloguser/register`, reqBody, "")
}

//----------------LOGIN------------------//

export const wanderLoginApi = (reqBody) => {
  return commonApi('POST', `${baseUrl}/wanderloguser/login`, reqBody, "")
}
//------------ADD WANDERLOG-------------//

export const addWanderLogApi = (body, header) => {
  return commonApi('POST', `${baseUrl}/wanderlog/addwanderlog`, body, header)
}

//-----------ALL WANDERLOG--------------//

export const allWanderlogApi = (Header) => {
  return commonApi('GET', `${baseUrl}/wanderlog/allWanderlogPost`, "", Header)
}
//-------- WANDERLOG USER POST -----//

export const userWanderlogPost = (header)=>{
 return commonApi('GET',`${baseUrl}/wanderlog/WanderlogUserPost`,"",header)

}
//----------UPDATE WANDERLOG--------//
export const updateWanderApi = (wanderId,body,header)=>{
 return commonApi('PUT',`${baseUrl}/wanderlog/wanderlogUpdate/${wanderId}`,body,header)
}
//--------DELETE WANDERLOG----------//
 export const deleteWanderApi = (wanderId,Header)=>{
 return commonApi('DELETE',`${baseUrl}/wanderlog/wanderlogDelete/${wanderId}`,{},Header)

}
//----------UPDATE PROFILE------------//
export const updateProfileApi = (reqBody,header)=>{
return commonApi('PUT',`${baseUrl}/wanderlog/updateWanderlogProfile`,reqBody,header)
}


