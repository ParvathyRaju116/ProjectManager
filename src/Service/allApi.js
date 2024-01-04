import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// register
export const registerApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
}

// login
export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}

// update profile
export const updateProfile =async(body,headers,id)=>{
    return await commonApi('PUT',`${BASE_URL}/user/update-profile/${id}`,body,headers)
}

// get profile
export const getProfileApi =async(id)=>{
    return await commonApi('GET',`${BASE_URL}/user/getprofile/${id}`,{},"")
}

// add project

export const addProjectApi =async(body,headers)=>{
    return await commonApi('POST',`${BASE_URL}/user/add-project`,body,headers)
}

// get user project
export const userProjectApi =async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-user-project/${id}`,"",headers)
}

// get all project
export const allProjectApi =async(searchData)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-all-project?search=${searchData}`,"",{})
}

// get home project
export const homeProjectApi =async()=>{
    return await commonApi('GET',`${BASE_URL}/user/get-home-project`,"",{})
}

// update project
export const updateProjectApi = async (body,header,id) => {
    return await commonApi("PUT",` ${BASE_URL}/user/edit-project/${id}`,body,header);
  };

//   delete
  export const deleteProjectSpi=async(headers,id)=>{
    return await commonApi('DELETE',`${BASE_URL}/user/delete-project/${id}`,{},headers)
  }




