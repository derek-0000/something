const url: string = "https://breta-back-end.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function SendLogo(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "lcswdj8q");
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dathf5czs/image/upload",
      { body: formData, method: "post" }
    );
    const result = await response.json();
    const imageUrl = result.secure_url;
    return imageUrl
  } catch (err) {
    console.log(err);
  }
}
export async function SendWallpaper(image: File, id: number|undefined) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "lcswdj8q");
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dathf5czs/image/upload",
      { body: formData, method: "post" }
    );
    const result = await response.json();
    const imageUrl = result.secure_url;
    return imageUrl
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateProfileLogo(imageUrl: string, id: number) {
  try {
    const graphqlQuerry: string = `mutation{
      updateProfile(user_id: "${id}" ,updateProfileInput: {
        wallpaper: "${imageUrl}"
      }){
        wallpaper
      }
    }`;
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: graphqlQuerry }),
    };
    const dbResponse = await fetch(url, options);
    const dbResult = await dbResponse.json();
    return dbResult
  } catch (err) {
    console.log(err);
  }
}
export async function UpdateProfileWallpaper(imageUrl: string, id: number) {
  try {
    const graphqlQuerry: string = `mutation{
      updateProfile(user_id: "${id}" ,updateProfileInput: {
        profile_picture: "${imageUrl}"
      }){
        profile_picture
      }
    }`;
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: graphqlQuerry }),
    };
    const dbResponse = await fetch(url, options);
    const dbResult = await dbResponse.json();
    return dbResult
  } catch (err) {
    console.log(err);
  }
}
