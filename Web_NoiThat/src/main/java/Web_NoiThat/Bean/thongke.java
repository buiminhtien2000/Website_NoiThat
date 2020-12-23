package Web_NoiThat.Bean;

public class thongke {
	
	private String productName;
	private int soluong;
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getSoluong() {
		return soluong;
	}
	public void setSoluong(int soluong) {
		this.soluong = soluong;
	}
	public thongke(String productName, int soluong) {
		super();
		this.productName = productName;
		this.soluong = soluong;
	}
	public thongke() {
		super();
	}
	
	
}
