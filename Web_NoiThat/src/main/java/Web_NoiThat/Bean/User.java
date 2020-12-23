package Web_NoiThat.Bean;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue
	private int id;
	private String 	name;
	private String account;
	private String 	password;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date birthDay;
	private String 	phoneOrEmail;
	private String adress;
	private String picture;
	private boolean position;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getPhoneOrEmail() {
		return phoneOrEmail;
	}

	public void setPhoneOrEmail(String phoneOrEmail) {
		this.phoneOrEmail = phoneOrEmail;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public boolean isPosition() {
		return position;
	}

	public void setPosition(boolean position) {
		this.position = position;
	}

	public User() {
		super();
	}

	public User(int id, String name, String account, String password, Date birthDay, String phoneOrEmail, String adress,
			String picture, boolean position) {
		super();
		this.id = id;
		this.name = name;
		this.account = account;
		this.password = password;
		this.birthDay = birthDay;
		this.phoneOrEmail = phoneOrEmail;
		this.adress = adress;
		this.picture = picture;
		this.position = position;
	}
	
}
