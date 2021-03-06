import { Toast } from "native-base";

export function BaseUrl() {

  return "http://192.168.4.113/api/buyer";

}

export function GetData(hash) {
  let BaseUrl = "http://192.168.4.113/api/buyer";
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + hash, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJSON => {
        // return responseJSON.data;
        resolve(responseJSON);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function ShowToast(message, _type) {
  Toast.show({
    text: message,
    buttonText: "Dismiss",
    buttonTextStyle: { color: "#fff" },
    buttonStyle: { borderWidth: 1, borderColor: "#fff" },
    duration: 5000,
    position: "bottom",
    type: _type
  });
}

// set user account initialized
export function setInitialized(user_id, v) {
  GetData("/account/setInitialized?value=" + v + "&user_id=" + user_id)
    .then(result => {
      let response = result;
    })
    .catch(error => {
      this.setState({
        isLoading: false,
        ajaxCallState: "NET_ERR",
        ajaxCallError: error.message
      });
      // notify the user
      ShowToast(error.message, "danger");
    });
}
