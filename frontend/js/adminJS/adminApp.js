var adminApp = angular.module("adminApp", ["ngRoute"]);
const path = "http://localhost:8080/Web_NoiThat";//link server
/*---------------------routing---------------------*/
adminApp.controller("managerProduct", function ($scope, $http,
	$routeParams) {
	var urlUploadFile = "C://Users/ADMIN/Desktop/DATN_BanHangNoiThat_Nhom7_PT14301UD/DATN_BanHangNoiThat_Nhom7_PT14301UD/frontend/upload/productPiture/";
	$scope.products = [];
	$scope.productsNew = [];
	$scope.form = {
		id: -1,
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
	/*--------------Phân trang-----------------------*/
	// $scope.check();
	// $scope.check = function () {
	// 	$login = angular.fromJson(localStorage.getItem('sessionUser'));
	// 	console.log($login.position);
	// 	//if($login.position)
	// }
	$scope.begin = 0;
	$scope.numPage = 1;
	$scope.pageCount = Math.ceil($scope.products.length / 4);
	$scope.next = function () {
		if ($scope.numPage < 4) {
			$scope.numPage++;
			console.log($scope.begin)
			return $scope.begin += 12;
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
	/*---------------------------------------------*/
	_refreshPageData();
	console.log($scope.products)
	$scope.convertBase64 = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		/*-------------------convertBase64----------------*/
		//lấy giá trị của file
		var selectedFile = document.getElementById("inputFile").files;
		//kiểm tra file có giá trị không
		if (selectedFile.length > 0) {
			//lấy phần tử của file
			var fileToLoad = selectedFile[0];
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.fileName = fileToLoad.name;
			$scope.fileUpload.root = urlUploadFile;
			// khởi tạo fileReader để đọc giá trị file
			var fileReader = new FileReader();
			//set giá trị pictureProduct trong mảng form
			$scope.form.pictureProduct = fileToLoad.name;
			fileReader.addEventListener("load", function (e) {
				//convert giá trị file sang base64
				var basefile = e.target.result;
				$scope.fileUpload.base64 = basefile.split(",")[1];
				$scope.fileUpload.fileName = fileToLoad.name;
				//gọi api upload file
				$scope.uploadFileAPI();
			}, false);
			// Convert data sang base64
			if (fileToLoad) {
				fileReader.readAsDataURL(fileToLoad);
			}

		}
	}
	/*----------------apiUploadFile-----------------*/
	$scope.uploadFileAPI = function () {
		$http({
			method: "POST",
			url: path + "/api/uploadFile.json",
			data: angular.toJson($scope.fileUpload),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error)
	}
	/*---------API_ADDPRODUCT------------*/
	$scope.addProduct = function () {
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		$scope.convertBase64();
		$http({
			method: "POST",
			url: path + "/api/manager_product.json",
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			alert("Thêm Thành Công!");
			window.location.href = "http://127.0.0.1:5500/admin/homeAdmin.html#!/listProduct";
		}, function error() {
			$scope.message = "Thêm Thất Bại!";
		});

	}
	/*-----------------API_UPDATEPRODUCT---------------------*/
	$scope.message = "";
	$scope.UpdateProduct = function () {
		$scope.form.productName = document.getElementById('productName').value;
		$scope.form.price = Number(document.getElementById('price').value);
		$scope.form.category = document.getElementById('category').value;
		$scope.form.quantity = Number(document.getElementById('quantity').value);
		$scope.form.description = document.getElementById('description').value;
		var fileUpload = document.getElementById('inputFile').files;
		if (fileUpload.length == 0) {
			$scope.form.pictureProduct = document.getElementById('pictureProduct').value;
		} else {
			$scope.convertBase64();
		}
		$http({
			method: "PUT",
			url: path + "/api/manager_product.json?id=" + $routeParams.id,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			alert("Cập Nhật Thành Công!");
			window.location.href = "http://127.0.0.1:5500/admin/homeAdmin.html#!/listProduct";
		}, function error() {
			$scope.message = "Cập Nhật Thất Bại!";
		});
	}

	/*-----------------API_DeleteProduct---------------------*/
	$scope.deleteProduct = function (id) {
		var r = confirm("Bạn có chắc muốn xóa sản phẩm!");
		if (r == true) {
			$http({
				method: "DELETE",
				url: path + "/api/manager_product.json?id=" + id
			}).then(_success, _error);
		}
	}

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
	$scope.findByCategory = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByCategory.json?category='
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.findByID = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectProductByID.json?id=' + $routeParams.id
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	// $scope.getNewProduct = function () {
	// 	$http({
	// 		method: 'GET',
	// 		url: path + '/api/selectProductNew.json'
	// 	}).then(function successCallback(response) {
	// 		$scope.productsNew = response.data;
	// 	}, function errorCallback(response) {
	// 		console.log(response.statusText);
	// 	});
	// }
	$scope.textSearch = "";
	$scope.search = function () {
		var text = document.getElementById('textSearch').value;
		if (text != null) {
			$scope.textSearch = text;
			console.log($scope.textSearch);
		}
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectProductNew.json'
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
		// $http({
		// 	method: 'GET',
		// 	url: path + '/api/selectAllProduct.json'
		// }).then(function successCallback(response) {
		// 	$scope.products = response.data;
		// }, function errorCallback(response) {
		// 	console.log(response.statusText);
		// });
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

/*--------------managerUser--------------*/
adminApp.controller("managerUser", function ($scope, $http) {
	var urlUploadFile = "C://Users/ASSUS/Desktop/duan2020/upload/userPiture/";
	$scope.users = [];
	$scope.user = [];
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
	_refreshPageData();
	$scope.loginUser1 = [];
	$scope.loginUser1 = angular.fromJson(localStorage.getItem('sessionUser'));
	$scope.a = $scope.loginUser1.position;
	$scope.check = function () {
			window.open(location.origin + "/index.html#!", "_self");

	}
	console.log($scope.loginUser);
	$scope.logout = function () {
		window.open(location.origin + "/index.html#!", "_self");
		localStorage.removeItem("sessionUser");
	}
	$scope.convertBase64 = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		/*-------------------convertBase64----------------*/
		//lấy giá trị của file
		var selectedFile = document.getElementById("inputFile").files;
		//kiểm tra file có giá trị không
		if (selectedFile.length > 0) {
			//lấy phần tử của file
			var fileToLoad = selectedFile[0];
			$scope.form.pictureProduct = fileToLoad.name;
			$scope.fileUpload.fileName = fileToLoad.name;
			$scope.fileUpload.root = urlUploadFile;
			// khởi tạo fileReader để đọc giá trị file
			var fileReader = new FileReader();
			//set giá trị pictureProduct trong mảng form
			$scope.form.pictureProduct = fileToLoad.name;
			fileReader.addEventListener("load", function (e) {
				//convert giá trị file sang base64
				var basefile = e.target.result;
				$scope.fileUpload.base64 = basefile.split(",")[1];
				$scope.fileUpload.fileName = fileToLoad.name;
				//gọi api upload file
				$scope.uploadFileAPI();
			}, false);
			// Convert data sang base64
			if (fileToLoad) {
				fileReader.readAsDataURL(fileToLoad);
			}

		}
	}
	/*----------------apiUploadFile-----------------*/
	$scope.uploadFileAPI = function () {
		$http({
			method: "POST",
			url: path + "/api/uploadFile.json",
			data: angular.toJson($scope.fileUpload),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error)
	}
	$scope.updateUser = function () {
		//lấy giá trị từ các trường gán cho mảng form
		var idUser = document.getElementById('idUser').value;
		$scope.form.name = document.getElementById('name').value;
		$scope.form.password = document.getElementById('password').value;
		$scope.form.birthDay = document.getElementById('birthday').value;
		$scope.form.phoneOrEmail = document.getElementById('phoneOrEmail').value;
		$scope.form.adress = document.getElementById('adress').value;
		var fileUpload = document.getElementById('inputFile').files;
		if (fileUpload.length == 0) {
			$scope.form.picture = document.getElementById('pictureProduct').innerHTML;
		} else {
			$scope.convertBase64();
		}
		$http({
			method: "PUT",
			url: path + "/api/manager_user.json?id=" + idUser,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success(){
			alert("Cập Nhật Thành Công!")
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
	$scope.displayUser = "false";
	$scope.checkUser = function () {
		if ($scope.form.account != null && $scope.form.account != null) {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.form.account === $scope.users[i].account && $scope.form.password === $scope.users[i].password) {
					$scope.user = $scope.users[i];
					localStorage.setItem('sessionUser', angular.toJson($scope.user));

					$scope.user = null;
					$scope.loginUser = localStorage.getItem('sessionUser');
					if ($scope.loginUser != null) {
						$scope.displayUser = "true";
					}
					location.reload();
				} else {
					$scope.error = "Tài Khoản Và Mật Khẩu Không Đúng";
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

/*--------------managerBill---------*/
adminApp.controller("managerBill", function ($scope, $http,$routeParams) {
	$scope.Bill = [];
	$scope.BillDetail = [];
	$scope.BillById = [];
	$scope.User = [];
	$scope.form = {
		id: "",
		idUser: 0,
		idProduct: 0,
		status: "",
		quantity: 0,
		totalMoney: "",
	};

	_refreshPageData();
	$scope.updateBill = function (id) {
		$http({
			method: "PUT",
			url: path + "/api/manager_bill.json?id=" + id,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function success() {
			alert("Cập Nhật Thành Công");
			location.reload();
		}, function error() {
				alert("Cập Nhật Thất bại");
		});
	}
	$scope.deleteBill = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_bill.json" + $scope.form.id,
		}).then(_success, _error);
	}
	$scope.getBillDetail = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectBillDetailByID.json?idBill=' + $routeParams.id
		}).then(function successCallback(response) {
			$scope.BillDetail = response.data;
			console.log($scope.Bill);
			
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.getUser = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectUserByID.json?id='+$routeParams.idUser
		}).then(function successCallback(response) {
			$scope.User = response.data;
			console.log($scope.Bill);
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	$scope.getBillById = function () {
		$http({
			method: 'GET',
			url: path + '/api/selectBillByID.json?idUser='+$routeParams.idUser+"&&id="+$routeParams.id
		}).then(function successCallback(response) {
			$scope.BillById = response.data;
			console.log($scope.Bill);
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllBill.json'
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

/*--------------managerDiscount---------*/
adminApp.controller("managerDiscount", function ($scope, $http) {
	$scope.discounts = [];
	$scope.form = {
		id: "",
		percentDiscount: "",
		Date: ""
	};

	_refreshPageData();

	$scope.submitDiscount = function () {
		var method = "";
		var url = "";
		$scope.form.price = Number($scope.form.price);
		$scope.form.quantity = Number($scope.form.quantity);
		if ($scope.form.id == "") {
			method = "POST";
			url = path + "/api/manager_discount.json";
		} else {
			method = "PUT";
			url = path + "/api/manager_discount.json";
		}
		$http({
			method: method,
			url: url,
			data: angular.toJson($scope.form),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_success, _error);
	}
	$scope.deleteDiscount = function () {
		$http({
			method: "DELETE",
			url: path + "/api/manager_discount.json"
		}).then(_success, _error);
	}
	function findById() {
		$http({
			method: 'GET',
			url: path + '/api/selectDiscountById.json?idUser='
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
	}
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAllDiscount.json'
		}).then(function successCallback(response) {
			$scope.discounts = response.data;
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
		$scope.form.percentDiscount = "";
		$scope.form.Date = "";
	};
});

/*--------------managerComment---------*/
adminApp.controller("managerComment", function ($scope, $http) {
	$scope.loginUser = angular.fromJson(localStorage.getItem('sessionUser'));
	
	$scope.products = [];
	_refreshPageData();
	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectProductNew.json'
		}).then(function successCallback(response) {
			$scope.products = response.data;
		}, function errorCallback(response) {
			console.log(response.statusText);
		});
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
		$scope.formcomment.idProduct = document.getElementById('a').value;
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
	
	$scope.commentidProduct4 = function ()
	{
		listcomment();
	}

	$scope.commentidProduct1 = "";
	listcomment();
	function listcomment() {
		var string = "";
		var level1 = 0;
		
		$http({
			method: 'GET',
			url: path + '/api/selectCommentByIdProduct.json?idProduct='+ document.getElementById('a').value
		}).then(function successCallback(response) {
			var so = 0;
			$scope.commentidProduct = response.data;
			for (i = 0; i < $scope.commentidProduct.length; i++) {
			var id = $scope.commentidProduct[i].id;
				var fullname = $scope.commentidProduct[i].fullname;
				var idUser = $scope.commentidProduct[i].idUser;
				var order_number = $scope.commentidProduct[i].order_number;
				var picture = $scope.commentidProduct[i].picture;
				var rating = $scope.commentidProduct[i].rating;
				var content = $scope.commentidProduct[i].content;
				var level = $scope.commentidProduct[i].level;
				var idProduct = $scope.commentidProduct[i].	idProduct;
				
			if (picture == "")
			{
				var img ="<img src='../images/1.jpg' width='64px' height='64px' class='mr-3' />"
			}
			else
			{
				var img ="<img src='../upload/userPicture/"+picture+"' width='64px' height='64px' class='mr-3' />"
			}
			
			var ten = " <h5 class='mt-0'>" + fullname +"<img src='../images/sao"+rating+".JPG' height='30px'width='auto'/>"+ "</h5>";
				var div = "<div class='media-body'>";
				
				
			var Reply = content+'<a class="hover-2 btn text-uppercase" data-toggle="modal" data-target="#binhluan" onclick="comment(' + 2 + ","
				+ order_number + ",'" + fullname+"')" +'">'+"<span class='icon-reply icon has - text - info'><i class='fas fa-comments'></i></span>Reply</a>";
				Reply += '<a class="hover-2 btn text-uppercase" onclick="deletecomment(' + id + ')"><img src="https://img.icons8.com/plasticine/100/000000/delete-chat--v1.png" height = 44px/> xóa </a>';
			if (order_number.length == 1 )
			{
				if (order_number != 1)
				{
					for (let index = 0; index < so; index++)
					{		
						string = string + "</div></div>";
					}
					so = 0;
					string = string + "</div></div>";
				}
				var a = "<div class='media'>";
				string = string+ a +img+ div + ten + Reply;
				level1 = 1;
			} else
			{
				var a1 = "<div class='media mt-3'>";
				string = string+a1 +img+ div + ten + Reply ;
				level1 = 2;
				so +=1 ;
				}
				
			
		}
			for (let index = 0; index < so; index++)
			{
					
					string = string + "</div></div>";
			}
			string = string + "</div></div>";
			document.getElementById('abcd').innerHTML = string;
			
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
	
});
/*--------------tongke---------*/
adminApp.controller("thongke", function ($scope, $http) {
	$scope.Bill1 = '';
	_refreshPageData();

	console.log($scope.Bill1);

	function _refreshPageData() {
		$http({
			method: 'GET',
			url: path + '/api/selectAlltop10cao.json'
		}).then(function successCallback(response) {
			$scope.Bill1 = response.data;

			console.log($scope.Bill1);


		}, function errorCallback(response) {
			// console.log(response.statusText);
			console.log(response.data);

		});
	}
});
adminApp.controller("thongke1", function ($scope, $http) {

	$scope.Bill2 = [];
	_refreshPageData1();
	function _refreshPageData1() {
		$http({
			method: 'GET',
			url: path + '/api/selectAlltop10thap.json'
		}).then(function successCallback(response) {
			$scope.Bill2 = response.data;
			console.log(response.data);

		}, function errorCallback(response) {
			// console.log(response.statusText);
			console.log(response.data);

		});
	}
});
adminApp.controller("thongke2", function ($scope, $http) {

	$scope.Bill2 = [];
	$scope.range = [];
	$scope.tongtien = 0;
	$scope.textSearch = "";
	$scope.textSearch2 = "";
	$scope.search = function () {
		if (document.getElementById('textSearch').value == '') {
			document.getElementById('textSearch').focus;
			alert('Xin vui lòng nhập từ ngày ');
			return;
		}
		if (document.getElementById('textSearch1').value == '') {
			document.getElementById('textSearch1').focus;
			alert('Xin vui lòng nhập đến ngày ');
			return;
		}
		var text = document.getElementById('textSearch').value;
		var text1 = document.getElementById('textSearch1').value;
		if (text != null) {
			$scope.textSearch = text;
			console.log($scope.textSearch);
		}
		if (text1 != null) {
			$scope.textSearch2 = text1;
			console.log($scope.textSearch2);
		}
		_refreshPageData1();
	}
	function _refreshPageData1() {
		var textSearxh = document.getElementById('textSearch').value;
		var textSearxh1 = document.getElementById('textSearch1').value;
		$http({
			method: 'GET',
			url: path + '/api/thongketongtien.json?date=' + $scope.textSearch + '&date1=' + $scope.textSearch2
		}).then(function successCallback(response) {
			$scope.Bill2 = response.data;
			var range = [];
			$scope.tongtien = 0;
			for (var i = 0; i < $scope.Bill2.length; i++) {
				range.push(i);

				$scope.tongtien += $scope.Bill2[i][1];
			}
			$scope.range = range;
			console.log(response.statusText);

		}, function errorCallback(response) {
			console.log(response.statusText);

		});
	}
	_refreshPageDataall();
	function _refreshPageDataall() {
		var textSearxh = document.getElementById('textSearch').value;
		var textSearxh1 = document.getElementById('textSearch1').value;
		$http({
			method: 'GET',
			url: path + '/api/thongketongtienall.json?'
		}).then(function successCallback(response) {
			$scope.Bill2 = response.data;
			console.log(response.statusText);
			var range = [];
			$scope.tongtien = 0;
			for (var i = 0; i < $scope.Bill2.length; i++) {
				range.push(i);

				$scope.tongtien += $scope.Bill2[i][1];
			}
			$scope.range = range;
		}, function errorCallback(response) {
			console.log(response.statusText);

		});
	}

});
adminApp.controller("thongke3", function ($scope, $http) {

	$scope.Bill2 = [];
	_refreshPageData1();
	function _refreshPageData1() {
		$http({
			method: 'GET',
			url: path + '/api/huyhang.json'
		}).then(function successCallback(response) {
			$scope.Bill2 = response.data;
			console.log(response.data);
			var range = [];
			$scope.tongtien = 0;
			for (var i = 0; i < $scope.Bill2.length; i++) {
				range.push(i);

				$scope.tongtien += $scope.Bill2[i][1];
			}
			$scope.range = range;
		}, function errorCallback(response) {
			// console.log(response.statusText);
			console.log(response.data);

		});
	}
});
/*------------------------end------------------------*/
adminApp.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "../admin/listProduct.html"
		})
		.when("/addProduct", {
			templateUrl: "../admin/addProduct.html"
		})
		.when("/updateProduct/:id", {
			templateUrl: "../admin/updateProduct.html"
		})
		.when("/listProduct", {
			templateUrl: "../admin/listProduct.html"
		})
		.when("/managerComment", {
			templateUrl: "../admin/managerComment.html"
		})
		.when("/managerBill", {
			templateUrl: "../admin/managerBill.html"
		})
		.when("/BillDetail/:id/:idUser", {
			templateUrl: "../admin/billDetail.html"
		})
		.when("/managerAccount", {
			templateUrl: "../admin/updateAccount.html"
		})
		.when("/top10spcao", {
			templateUrl: "../admin/listtop10spcao.html"
		})
		.when("/top10spthap", {
			templateUrl: "../admin/listtop10spthap.html"
		})
		.when("/tongtien", {
			templateUrl: "../admin/thongketongtien.html"
		})
		.when("/huyhang", {
			templateUrl: "../admin/thongkehuyhang.html"
		})
});
