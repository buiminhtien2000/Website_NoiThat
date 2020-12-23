package Web_NoiThat.Bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "bill")
public class Bill {
	@Id
	private String id;
	private int idUser;
	private String fullName;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date dateOfSale;
	private String 	status;
	private float totalMoney;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public Date getDateOfSale() {
		return dateOfSale;
	}
	public void setDateOfSale(Date dateOfSale) {
		this.dateOfSale = dateOfSale;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public float getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(float totalMoney) {
		this.totalMoney = totalMoney;
	}
	public Bill(String id, int idUser, String fullName, Date dateOfSale, String status, float totalMoney) {
		super();
		this.id = id;
		this.idUser = idUser;
		this.fullName = fullName;
		this.dateOfSale = dateOfSale;
		this.status = status;
		this.totalMoney = totalMoney;
	}
	public Bill() {
		super();
	}
	
}
