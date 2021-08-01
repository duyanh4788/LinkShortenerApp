const regex = new RegExp("^(http|https|ftp)://", "i");
document.getElementById("divCopy").style.display = "none"
let valid = true;

const getUrl = () => {
  let url = document.getElementById('txtUrl').value;
  if (url === "") {
    alert("Nhập URL !")
    valid = false
  } else {
    valid = true
  }

  let checkUrl = regex.test(url);
  return checkUrl ? url : ('http://' + url);
}

const shortenUrl = (event) => {
  event.preventDefault()
  let longUrl = getUrl();
  bitLyApi(longUrl)
}

const bitLyApi = (longUrl) => {
  let toKenBitly = "e862e0bf910aa2f4a5936e00cc2fc8602d6f56b5";
  console.log(valid);
  if (valid) {
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method:
        'POST',
      headers: {
        'Authorization': `Bearer ${toKenBitly}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "long_url": longUrl })
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("showShortA").innerHTML = `<a href=${data.link} target="_blank">` + data.link + "<a>";
        document.getElementById("showShortInput").innerHTML = `<input id="copyInput" type="text" value=${data.link}>`;
        document.getElementById("divCopy").style.display = "block"
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

const copyUrl = () => {
  var copyText = document.getElementById("copyInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  let tooltip = document.getElementById("tooltip")
  tooltip.innerHTML = "Copy Success"
}

const outCopy = () => {
  let tooltip = document.getElementById("tooltip")
  tooltip.innerHTML = "Click Get Url : "
}