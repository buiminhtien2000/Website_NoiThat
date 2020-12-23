package Web_NoiThat.Bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue
	private int id;
	private String productName;
	private float price;
	private String category;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date dateAdded;
	private String description;
	private int quantity;
	private String pictureProduct;
	
	public Product() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(Date dateAdded) {
		this.dateAdded = dateAdded;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getPictureProduct() {
		return pictureProduct;
	}

	public void setPictureProduct(String pictureProduct) {
		this.pictureProduct = pictureProduct;
	}

	public Product(int id, String productName, float price, String category, Date dateAdded, String description,
			int quantity, String pictureProduct) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.category = category;
		this.dateAdded = dateAdded;
		this.description = description;
		this.quantity = quantity;
		this.pictureProduct = pictureProduct;
	}
	
}
