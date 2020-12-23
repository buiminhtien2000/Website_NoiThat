package Web_NoiThat.Bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {
	@Id
	@GeneratedValue
	private int id;
	private int idProduct;
	private int idUser;
	private String fullname;
	private String picture;
	private int level;
	private String order_number;
	private int rating;
	private String content;
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
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getOrder_number() {
		return order_number;
	}
	public void setOrder_number(String order_number) {
		this.order_number = order_number;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Comment(int id, int idProduct, int idUser, String fullname, String picture, int level, String order_number,
			int rating, String content) {
		super();
		this.id = id;
		this.idProduct = idProduct;
		this.idUser = idUser;
		this.fullname = fullname;
		this.picture = picture;
		this.level = level;
		this.order_number = order_number;
		this.rating = rating;
		this.content = content;
	}
	public Comment() {
		super();
	}
	
}
