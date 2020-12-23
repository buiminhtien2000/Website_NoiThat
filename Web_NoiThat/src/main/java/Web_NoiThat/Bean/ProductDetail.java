package Web_NoiThat.Bean;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "productdetails")
public class ProductDetail {
	@Id
	private int idProduct;
	private String material;
	private String trademark;
	private String 	color;
	private String size;
	/*@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProduct")
	private Product product;*/
	
	public int getIdProduct() {
		return idProduct;
	}

	public void setIdProduct(int idProduct) {
		this.idProduct = idProduct;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public String getTrademark() {
		return trademark;
	}

	public void setTrademark(String trademark) {
		this.trademark = trademark;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public ProductDetail() {
		super();
	}

	public ProductDetail(int idProduct, String material, String trademark, String color, String size) {
		super();
		this.idProduct = idProduct;
		this.material = material;
		this.trademark = trademark;
		this.color = color;
		this.size = size;
	}
	
}
