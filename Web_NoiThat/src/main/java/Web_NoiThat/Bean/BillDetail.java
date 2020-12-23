package Web_NoiThat.Bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "billdetail")
public class BillDetail {
	@Id
	@GeneratedValue
	private int id;
	private int idProduct;
	private String productName;
	private String idBill;
	private int quantity;
	private float totalMoney;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getIdProduct() {
		return idProduct;
	}
	public void setIdProduct(int idProduct) {
		this.idProduct = idProduct;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getIdBill() {
		return idBill;
	}
	public void setIdBill(String idBill) {
		this.idBill = idBill;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(float totalMoney) {
		this.totalMoney = totalMoney;
	}
	public BillDetail(int id, int idProduct, String productName, String idBill, int quantity, float totalMoney) {
		super();
		this.id = id;
		this.idProduct = idProduct;
		this.productName = productName;
		this.idBill = idBill;
		this.quantity = quantity;
		this.totalMoney = totalMoney;
	}
	public BillDetail() {
		super();
	}
	
}
	
	