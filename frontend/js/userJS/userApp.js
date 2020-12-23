var userApp = angular.module("userApp", ["ngRoute"]);
const path = "http://localhost:8080/Web_NoiThat";//link server
var urlUploadFile = "C://Users/ADMIN/Desktop/DATN_BanHangNoiThat_Nhom7_PT14301UD/DATN_BanHangNoiThat_Nhom7_PT14301UD/frontend/upload/userPiture/";

/*---------------------routing---------------------*/
userApp.controller("managerProduct", function ($scope, $http,
	$routeParams) {
	$scope.products = [];
	$scope.productsByCategory = [];
	$scope.productsNew = [];
	$scope.form = {
		id: "",
		productName: "",
		price: 0,
		category: "",
		note: "",
		description: "",
		quantity: 0,
		pictureProduct: "",
	};
	$scope.fileUpload = {
		fileName: "",
		base64: "",
		root: ""
	}
	/*-------------------- Phân trang--------------------------*/
	$scope.begin = 0;
	$scope.numPage = 1;
	$scope.pageCount = Math.ceil($scope.products.length / 4);
	$scope.next = function () {
		if ($scope.numPage < 4) {
			$scope.numPage++;
			console.log($scope.begin)
			return $scope.begin += 8;
		} else {
			return false;
		}

	}
	$scope.prev = function () {
		if ($scope.numPage > 1) {
			$scope.numPage--;
			return $scope.begin -= 8;
		} else {
			return false;
		}

	}
	/*-------------------------------------------------*/
	_refreshPageData();
	/*-----------------API_Select---------------------*/
	$scope.findByName = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByName.json?name='
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findByCategory = function (category) {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByCategory.json?category=' + category
		}).then(function successCallback(response) {
			$scope.productsByCategory = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.productByCategory = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByCategory.json?category=' + $routeParams.category
		}).then(function successCallback(response) {
			$scope.productsByCategory = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.getNewProduct = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductNew.json'
		}).then(function successCallback(response) {
			$scope.productsNew = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.textSearch = "";
	$scope.search = function () {
		var text = document.getElementById('textSearch').value;
		if (text != null) {
			$scope.textSearch = text;
			console.log($scope.textSearch);
		}
	}
	function _refreshPageData(textSearch) {
		$scope.url = path + '/api/selectAllProduct.json'
		if (textSearch != null) {
			$scope.url = path + '/api/selectAllProduct.json';
		}
		$http({
			method: 'GET',
			url: $scope.url
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	/*------------END-----------*/


	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.productName = "";
		$scope.form.price = 0;
		$scope.form.category = "";
		$scope.form.note = "";
		$scope.form.description = "";
		$scope.form.quantity = 0;
		document.getElementById("inputFile").value = "";
	};
});
userApp.controller("productDetail", function ($scope, $http,
	$routeParams) {
	$scope.productsByCategory = [];
	$scope.product = [];
	$scope.formCart = {
		idProduct: -1,
		price: 0,
		productName: "",
		quantity: 0,
		totalMoney: 0,
		pictureProduct: ""
	}
	$scope.formBillDetail = {
		id: -1,
		idBill: 0,
		idProduct: 0,
		productName: "",
		quantity: 0,
		totalMoney: 0
	};
	$scope.form = {
		id: -1,
		idUser: 0,
		fullName: "",
		status: "",
		totalMoney: "",
	};
	$scope.comment = function (a, b,c)
	{	
		
		document.getElementById('level').value = a;
		document.getElementById('order_number').value = b;
		document.getElementById('fullname').value = c;
	}
	$scope.formcomment = [];
	$scope.formcomment = {
		id: -1,
		idProduct: 0,
		idUser: 0,
		fullname: "",
		picture:"",
		level: 0,
		order_number: "",
		rating: 0,
		content:""
	};
	$scope.addcomment = function ()
	{
		if (localStorage.getItem("sessionUser") == null) {
			$('#login-button').click();
			alert("Vui lòng đăng nhập bình luận!");
			$('#cancel-btn').click();
			return;
		} 
		if (document.getElementById('sao').value == "")
		{
			alert("Vui lòng chọn Đánh giá sao!");
			return
		}
		if (document.getElementById('new-review').value == "")
		{
			alert("Vui lòng viết Nhận xét của bạn!");
			return
		}
		$scope.formcomment.idProduct = $routeParams.id;
		$scope.formcomment.idUser = $scope.loginUser.id ;
		$scope.formcomment.fullname = $scope.loginUser.name;
		$scope.formcomment.picture = $scope.loginUser.picture;
		$scope.formcomment.level = Number(document.getElementById('level').value);
		$scope.formcomment.order_number = document.getElementById('order_number').value;
		$scope.formcomment.rating = Number(document.getElementById('sao').value);
		$scope.formcomment.content = document.getElementById('new-review').value;
		if (document.getElementById('fullname').value !="")
		{
			$scope.formcomment.content ="Trả lời " +document.getElementById('fullname').value+ " : "+ document.getElementById('new-review').value;
		}
		console.log($scope.formcomment);
		$('#cancel-btn').click();
			$http({
			method: "POST",
			url: path + "/api/manager_comment.json",
			data: angular.toJson($scope.formcomment),
			headers: {
				'Content-Type': 'application/json'
				}
			
		}).then(function success() {
			listcomment();
		}, function error() {
			
		});
		
	}
	$scope.commentidProduct = [];
	


	$scope.commentidProduct1 = "";
	listcomment();
	function listcomment() {
		var string = "";
		var level1 = 0;
		
		$http({
			method: 'GET',
			url: path + '/api/selectCommentByIdProduct.json?idProduct='+$routeParams.id
		}).then(function successCallback(response) {
			
			$scope.commentidProduct = response.data;
			var so = 0;
			for (i = 0; i < $scope.commentidProduct.length; i++) {
				var id = $scope.commentidProduct[i].id;
				var fullname = $scope.commentidProduct[i].fullname;
				var idUser = $scope.commentidProduct[i].idUser;
				var order_number = $scope.commentidProduct[i].order_number;
				var picture = $scope.commentidProduct[i].picture;
				var rating = $scope.commentidProduct[i].rating;
				var content = $scope.commentidProduct[i].content;
				var level = $scope.commentidProduct[i].level;
				
			if (picture == '')
			{
				var img ="<img src='images/1.jpg' width='64px' height='64px' class='mr-3' />"
			}
			else
			{
				var img ="<img src='upload/userPicture/"+picture+"' width='64px' height='64px' class='mr-3' />"
			}
			
			var ten = " <h5 class='mt-0'>" + fullname +"<img src='images/sao"+rating+".JPG' height='30px'width='auto'/>"+ "</h5>";
				var div = "<div class='media-body'>";
				level1 = level + 1;
				
			var Reply = content+'<a class="hover-2 btn text-uppercase" data-toggle="modal" data-target="#binhluan" onclick="comment1(' + level1 + ",'"
				+ order_number + " ','" + fullname+"')" +'">'+"<span class='icon-reply icon has - text - info'><i class='fas fa-comments'></i></span>Reply</a>";
		
				if (idUser == $scope.loginUser.id)
				{
					Reply += '<a class="hover-2 btn text-uppercase" onclick="deletecomment('+id+')"><img src="https://img.icons8.com/plasticine/100/000000/delete-chat--v1.png" height = 44px/> xóa </a>'
				}
			if (order_number.length == 1 )
			{
				if (order_number != 1)
				{
					for (let index = 0; index < so; index++) {
						
						string = string + "</div></div>";
					}
					string = string + "</div></div>";
					so = 0;
				}
				var a = "<div class='media'>";
				string = string+ a +img+ div + ten + Reply;
				level1 = 1;
			} else
			{
				var a1 = "<div class='media mt-3'>";
				string = string+a1 +img+ div + ten + Reply  ;
				level1 = 2;
				so += 1;
				}
				
			
		}
			for (let index = 0; index < so; index++)
			{
					
					string = string + "</div></div>";
			}
			string = string + "</div></div>";
			document.getElementById('abc').innerHTML = string;
			
		}, function errorCallback(response) {
				
			console.log(response.statusText);
		});
		
	}
	$scope.deletecomment = function () {
		var id = document.getElementById('ida').value;
		
		$http({
			method: "DELETE",
			url: path + "/api/manager_comment.json?id=" + id
		}).then(function success() {
			listcomment();
		}, function error() {
			
		});
	}
	$scope.findByName = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByName.json?name='
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findProductByID = function () {
		console.log($routeParams.id);
		$http({
			method: 'GET',
			url: path + '/api/selectProductById.json?id=' + $routeParams.id
		}).then(function successCallback(response) {
			$scope.product = response.data;
			$scope.sumMoney($scope.product[0].price);
			$scope.findByCategory($scope.product[0].category);
			console.log($scope.product[0].category)
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findByCategory = function (category) {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByCategory.json?category=' + category
		}).then(function successCallback(response) {
			$scope.productsByCategory = response.data;
			console.log($scope.productsByCategory)
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.totalMoney = 0;
	$scope.quantity = 1;
	$scope.loginUser = [];
	$scope.loginUser = angular.fromJson(localStorage.getItem('sessionUser'));
	$scope.sumMoney = function (price) {
		return $scope.totalMoney = $scope.quantity * price;
	}
	$scope.addCart = function () {
		$scope.listCart = [];
		$scope.formCart.idProduct = Number(document.getElementById('idProduct').value);
		$scope.formCart.price = Number(document.getElementById('price').value);
		$scope.formCart.productName = document.getElementById('productName').value;
		console.log($scope.formCart.productName)
		$scope.formCart.quantity = $scope.quantity;
		$scope.formCart.totalMoney = Number(document.getElementById("totalMoney").value);
		$scope.formCart.pictureProduct = document.getElementById('pictureProduct').value;
		if (localStorage.getItem('listCart') != null) {
			$scope.result = true;
			$scope.listCart = angular.fromJson(localStorage.getItem('listCart'))
			for (i = 0; i < $scope.listCart.length; i++) {
				if ($scope.formCart.idProduct == $scope.listCart[i].idProduct) {
					$scope.listCart[i].quantity += $scope.formCart.quantity;
					$scope.listCart[i].totalMoney = $scope.listCart[i].quantity * $scope.formCart.price;
					$scope.result = true;
					break;
				} else {
					$scope.result = false;
				}
			}
			if ($scope.result == false) {
				$scope.listCart.push($scope.formCart);
			}
		} else {
			$scope.listCart.push($scope.formCart);
		}
		alert("Sản phẩm đã được thêm vào giỏ hàng");
		localStorage.setItem('listCart', angular.toJson($scope.listCart));
		$scope.listCart = [];
		$scope.formCart = {
			idProduct: -1,
			idUser: -1,
			price: 0,
			productName: "",
			quantity: 0,
			totalMoney: 0,
			pictureProduct: ""
		}
	}

	$scope.addBillDetail = function (idBill, idProduct, productName, totalMoney, quantity) {
		$scope.formBillDetail.idBill = idBill;
		$scope.formBillDetail.idProduct = idProduct;
		$scope.formBillDetail.productName = productName;
		$scope.formBillDetail.quantity = quantity;
		$scope.formBillDetail.totalMoney = totalMoney;
		$http({
			method: "POST",
			url: path + "/api/manager_billDetail.json",
			data: angular.toJson($scope.formBillDetail),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			$scope.mesenger = "Đăng Ký Thành Công!"
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.addBill = function (id, idUser, fullName, totalMoney) {
		$scope.form.id = id;
		$scope.form.idUser = idUser;
		$scope.form.fullName = fullName;
		$scope.form.status = "1";
		$scope.form.totalMoney = totalMoney;
		$http({
			method: "POST",
			url: path + "/api/manager_bill.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			$scope.mesenger = "Đăng Ký Thành Công!"
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.makeid = function (length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for (var i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	$scope.thanhtoan = function () {
		if (localStorage.getItem("sessionUser") == null) {
			alert("Vui lòng đăng nhập để thanh toán!");
		} else {
			$scope.idProduct = Number(document.getElementById("idProduct").value);
			$scope.totalMoney = Number(document.getElementById("totalMoney").value);
			$scope.productName = document.getElementById("productName").value;
			$scope.quantity = Number(document.getElementById("quantity").value);
			$scope.idUser = $scope.loginUser.id;
			$scope.fullName = $scope.loginUser.name;
			var a = $scope.makeid(10);
			$scope.addBill(a, $scope.idUser, $scope.fullName, $scope.totalMoney);
			$scope.listcart = angular.fromJson(localStorage.getItem('listCart'));
			$scope.addBillDetail(a, $scope.idProduct, $scope.productName, $scope.totalMoney, $scope.quantity);
				// }
			alert("Đặt Hàng Thành Công,Đang Chờ Xử Lý,Đơn Hàng Sẽ Được Xác Nhận Trong Vòng 24!");
			localStorage.removeItem('listCart');
			window.open(location.origin + "#!", "_self");
		}
	}
})
/*--------------managerBill---------*/
userApp.controller("managerBill", function ($scope, $http,$routeParams) {
	$scope.Bill = [];
	$scope.form = {
		id: "",
		idUser: 0,
		idProduct: 0,
		status: "",
		quantity: 0,
		totalMoney: "",
	};
	if(localStorage.getItem('sessionUser') != null){
		$scope.listUser = angular.fromJson(localStorage.getItem('sessionUser'))
		_refreshPageData($scope.listUser["id"]);
	}
	
	$scope.updateBill = function (id) {
		var r = confirm("Bạn có chắc muốn hủy đơn hàng này?");
		if (r == true) {
			$http({
				method: "PUT",
				url: path + "/api/manager_bill.json?id=" + id,
				data: angular.toJson($scope.form),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function success() {
				alert("Hủy Thành Công");
				location.reload();
			}, _error);
		}
	}
	function _refreshPageData(idUser) {
		$http({
			method: 'GET',
			url: path + '/api/selectBillByStatus.json?idUser='+idUser
		}).then(function successCallback(response) {
			$scope.Bill = response.data;
			console.log($scope.Bill);
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.name = "";
		$scope.form.account = "";
		$scope.form.password = "";
		$scope.form.birthDay = "";
		$scope.form.phoneOrEmail = "";
		$scope.form.adress = "";
		$scope.form.picture = "";
		$scope.form.position = "";
	};
});
/*===================CARTAAAAAAA=======================*/
userApp.controller("cart", function ($scope, $http) {
	$scope.loginUser = [];
	$scope.Bill = [];
	$scope.BillDetail = [];
	$scope.form = {
		id: -1,
		idUser: 0,
		fullName: "",
		status: "",
		totalMoney: "",
	};
	$scope.formBillDetail = {
		id: -1,
		idBill: 0,
		idProduct: 0,
		productName: "",
		quantity: 0,
		totalMoney: 0
	};
	$scope.listCart = [];
	if (localStorage.getItem('listCart') != null) {
		$scope.listCart = angular.fromJson(localStorage.getItem('listCart'));
	}
	$scope.loginUser = angular.fromJson(localStorage.getItem('sessionUser'));
	$scope.updateBillDetail = function () {
		$scope.form.idUser = Number($scope.form.idUser);
		$scope.form.idBill = Number($scope.form.idBill);
		$scope.form.quantity = Number($scope.form.quantity);
		$scope.form.totalMoney = Number($scope.form.totalMoney);
		$http({
			method: "PUT",
			url: path + "/api/manager_billDetail.json",
			data: angular.toJson($scope.formBillDetail),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			$scope.mesenger = "Đăng Ký Thành Công!"
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.addBillDetail = function (idBill, idProduct, productName, totalMoney, quantity) {
		$scope.formBillDetail.idBill = idBill;
		$scope.formBillDetail.idProduct = idProduct;
		$scope.formBillDetail.productName = productName;
		$scope.formBillDetail.quantity = quantity;
		$scope.formBillDetail.totalMoney = totalMoney;
		$http({
			method: "POST",
			url: path + "/api/manager_billDetail.json",
			data: angular.toJson($scope.formBillDetail),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			console.log("thanh cong")
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.addBill = function (id, idUser, fullName, totalMoney) {
		$scope.form.id = id;
		$scope.form.idUser = idUser;
		$scope.form.fullName = fullName;
		$scope.form.status = "1";
		$scope.form.totalMoney = totalMoney;
		$http({
			method: "POST",
			url: path + "/api/manager_bill.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			$scope.mesenger = "Đăng Ký Thành Công!"
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.delteCart = function (id) {
		var r = confirm("Bạn có chắc muốn xóa sản phẩm!");
		if (r == true) {
			$scope.listCart = [];
			if (localStorage.getItem('listCart') != null) {
				$scope.result = true;
				$scope.listCart = angular.fromJson(localStorage.getItem('listCart'))
				for (i = 0; i < $scope.listCart.length; i++) {
					if ($scope.listCart.length > 1) {
						if (id == $scope.listCart[i].idProduct) {
							console.log(i);
							$scope.listCart.splice(i, 1);
							$scope.result = true;
							localStorage.setItem('listCart', angular.toJson($scope.listCart));

							break;
						}
					} else {
						localStorage.removeItem('listCart');
						location.reload();

					}
				}
			}
		}
	}
	$scope.updateProduct = function (idProduct) {
		var quantity1 = "quantity" + idProduct;
		var quantity = Number(document.getElementById(quantity1).value);
		console.log(quantity)
		$scope.listCart = angular.fromJson(localStorage.getItem('listCart'))
		for (i = 0; i < $scope.listCart.length; i++) {
			if (idProduct == $scope.listCart[i].idProduct) {
				$scope.listCart[i].quantity = quantity;
				$scope.listCart[i].totalMoney = $scope.listCart[i].quantity * $scope.listCart[i].price;
				$scope.result = true;
				break;
			} else {
				$scope.result = false;
			}
		}
		localStorage.setItem('listCart', angular.toJson($scope.listCart));

	}
	$scope.date1 = new Date();
	$scope.tongtien = function () {
		$a = 0;
		for (i = 0; i < $scope.listCart.length; i++) {
			$a += $scope.listCart[i].totalMoney;
		}
		return $a;
	}
	$scope.makeid = function (length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for (var i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	$scope.thanhtoan = function () {
		if (localStorage.getItem("sessionUser") == null) {
			alert("Vui lòng đăng nhập để thanh toán!");
		} else {
			$scope.totalMoney = 0;
			for (i = 0; i < $scope.listCart.length; i++) {
				$scope.totalMoney += $scope.listCart[i].totalMoney;
			}
			$scope.idUser = $scope.loginUser.id;
			$scope.fullName = $scope.loginUser.name;
			var a = $scope.makeid(10);
			$scope.addBill(a, $scope.idUser, $scope.fullName, $scope.totalMoney);
			$http({
				method: 'GET',
				url: path + '/api/selectBillByUser.json?idUser='+$scope.idUser
			}).then(function successCallback(response) {
				$scope.listcart = angular.fromJson(localStorage.getItem('listCart'));
				for (i = 0; i < $scope.listcart.length; i++) {
					$scope.addBillDetail(a, $scope.listcart[i].idProduct, $scope.listcart[i].productName, $scope.listcart[i].totalMoney, $scope.listcart[i].quantity);
				}
				// }
				alert("Đặt Hàng Thành Công,Đang Chờ Xử Lý,Đơn Hàng Sẽ Được Xác Nhận Trong Vòng 24!");
				localStorage.removeItem('listCart');
				window.open(location.origin + "#!", "_self");
			}, function errorCallback(response) {
				console.log(response.statusText);
			});
		}
	}
	function getBillDetailById(idUser) {
		$http({
			method: 'GET',
			url: path + '/api/selectBillDetailByID.json?idUser=' + idUser
		}).then(function successCallback(response) {
			$scope.BillDetail = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findById = function (idUser) {
		$http({
			method: 'GET',
			url: path + '/api/selectBillByID.json?idUser=' + idUser
		}).then(function successCallback(response) {
			$scope.Bill = response.data;
			console.log($scope.Bill[0].id)
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
})
/*--------------managerUser--------------*/
userApp.controller("managerUser", function ($scope, $http) {
	$scope.users = [];
	$scope.fileUpload = {
		fileName: "",
		base64: "",
		root: ""
	}
	$scope.form = {
		id: -1,
		name: "",
		account: "",
		password: "",
		birthDay: "",
		phoneOrEmail: "",
		adress: "",
		picture: "",
		position: 0,
	};
	$scope.mesenger = "";
	$scope.loginUser = [];
	$scope.displayUser;
	$scope.error = "";
	_refreshPageData();
	checkUser();
	/*----------------apiUploadFile-----------------*/
	$scope.uploadFileAPI = function () {
		/*-------------------convertBase64----------------*/
		//lấy giá trị của file
		var selectedFile = document.getElementById("inputFile").files;
		//kiểm tra file có giá trị không
		if (selectedFile.length > 0) {
			//lấy phần tử của file
			var fileToLoad = selectedFile[0];
			console.log(fileToLoad.name);
			$scope.form.picture = fileToLoad.name;
			$scope.fileUpload.fileName = fileToLoad.name;
			// khởi tạo fileReader để đọc giá trị file
			var fileReader = new FileReader();
			//set giá trị pictureProduct trong mảng form
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.root = urlUploadFile;
			fileReader.addEventListener("load", function (e) {
				//convert giá trị file sang base64
				var basefile = e.target.result;
				$scope.fileUpload.base64 = basefile.split(",")[1];
				$scope.fileUpload.fileName = fileToLoad.name;
			}, false);
			// Convert data sang base64
			if (fileToLoad) {
				fileReader.readAsDataURL(fileToLoad);
			}
		}
		$http({
			method: "POST",
			//url gọi api
			url: path + "/api/uploadFile.json",
			data: angular.toJson($scope.fileUpload),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			
		}, _error);
	}
	$scope.addUser = function () {
		var birthday = document.getElementById("birthday").valueAsDate;
		$scope.form.birthDay = birthday.toISOString();
		$http({
			method: "POST",
			url: path + "/api/manager_user.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			$scope.mesenger = "Đăng Ký Thành Công!"
			location.reload();
		}, function error() {
			$scope.mesenger = "Đăng Ký Thất Bại!"
		});
	}
	$scope.updateUser = function () {
		//lấy giá trị từ các trường gán cho mảng form
		var idUser = document.getElementById('idUser').value;
		$scope.form.id = idUser;
		$scope.form.name = document.getElementById('name').value;
		$scope.form.password = document.getElementById('password').value;
		$scope.form.birthDay = document.getElementById('birthday').value;
		$scope.form.phoneOrEmail = document.getElementById('phoneOrEmail').value;
		$scope.form.adress = document.getElementById('adress').value;
		var fileUpload = document.getElementById('inputFile').files;
		if (fileUpload.length == 0) {
			$scope.form.picture = document.getElementById('pictureProduct').innerHTML;
		} else {
			$scope.uploadFileAPI();
		}
		$http({
			method: "PUT",
			url: path + "/api/manager_user.json?id=" + idUser,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			localStorage.removeItem("sessionUser");
			localStorage.setItem('sessionUser', angular.toJson($scope.form));
			$scope.loginUser1 = angular.fromJson(localStorage.getItem('sessionUser'));
			alert("Cập Nhật Thành Công!");
			location.reload();
		}, _error);
	}
	$scope.deleteUser = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_user.json?id=" + $scope.form.id,
		}).then(_success, _error);
	}
	$scope.loginUser = [];
//	$scope.displayUser = "false";
	function checkUser() {
		$scope.loginUser1 = angular.fromJson(localStorage.getItem('sessionUser'));
		
		if (angular.fromJson(localStorage.getItem('sessionUser')) == null) {
			$scope.displayUser = "false" ;
		} else {
			$scope.displayUser = "true";
		}
	}
	$scope.logout = function () {
		localStorage.removeItem("sessionUser");
		location.reload();
	}
	$scope.login = function () {
		if ($scope.form.account != "" && $scope.form.account != "") {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.form.account === $scope.users[i].account && $scope.form.password === $scope.users[i].password) {
					$scope.user = $scope.users[i];
					localStorage.setItem('sessionUser', angular.toJson($scope.user));
					$scope.user = null;
					$scope.loginUser = angular.fromJson(localStorage.getItem('sessionUser'));
					checkUser();
					if ($scope.loginUser.position == true) {
						window.open(location.origin + "/admin/homeAdmin.html", "_self");
					} else {
						location.reload();
					}
				} else {
					$scope.error = "Tài Khoản Hoặc Mật Khẩu Không Đúng";
				}
			}
		} else {
			$scope.error = "Tài Khoản Và Mật Khẩu Không Được Để Trống";
		}
	}
	$scope.findById = function () {
		$scope.listUser = angular.fromJson(localStorage.getItem('sessionUser'))
		$http({
			method: 'GET',
			url: path + '/api/selectUserByID.json?id='+$scope.listUser.id
		}).then(function successCallback(response) {
			$scope.user = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllUser.json'
		}).then(function successCallback(response) {
			$scope.users = response.data;
			console.log($scope.users)
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _success(response) {
		_refreshPageData();
		_clearForm()
	}

	function _error(response) {
		console.log(response.statusText);
	}
	function _clearForm() {
		$scope.form.price = 0;
		$scope.form.category = "";
		$scope.form.note = "";
		$scope.form.description = "";
		$scope.form.quantity = 0;
		document.getElementById("inputFile").value = "";
	};
});
userApp.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "listProduct.html"
		})
		.when("/shoppingcart", {
			templateUrl: "shoppingcart.html"
		}).when("/ProductDetail/:id", {
			templateUrl: "product-detal.html"
		})
		.when("/pay", {

			templateUrl: "pay.html"

		})
		.when("/managerBill", {

			templateUrl: "managerBill.html"

		})
		.when("/managerAccount", {

			templateUrl: "managerUser.html"

		})
		.when("/category/:category", {
			templateUrl: "productCategory.html"
		})
});
