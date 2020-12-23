package Web_NoiThat.Bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "discount")
public class Discount {
	@Id
	private String id;
	private String percentDiscount;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date deadline;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPercentDiscount() {
		return percentDiscount;
	}

	public void setPercentDiscount(String percentDiscount) {
		this.percentDiscount = percentDiscount;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public Discount() {
		super();
	}

	public Discount(String id, String percentDiscount, Date deadline) {
		super();
		this.id = id;
		this.percentDiscount = percentDiscount;
		this.deadline = deadline;
	}
	
}
