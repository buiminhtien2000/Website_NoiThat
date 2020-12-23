package Web_NoiThat.Controller.API;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Web_NoiThat.Bean.BillDetail;
import Web_NoiThat.Bean.thongke;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "BillDetailAPI")
public class BillDetailAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_billDetail",produces = MediaType.APPLICATION_JSON_UTF8_VALUE + "; charset=UTF-8",method = RequestMethod.POST)
	public BillDetail createBillDetai(@RequestBody BillDetail billDetaill){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.save(billDetaill);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		return billDetaill;
	}
	@RequestMapping(value = "/api/manager_billDetail",method = RequestMethod.PUT)
	public void updateBillDetai(@RequestParam("id") int id,
            @RequestBody BillDetail billDetails){
		Session s = factory.getCurrentSession();
		BillDetail billDetail = (BillDetail) s.get(BillDetail.class,id);
		billDetail.setQuantity(billDetails.getQuantity());
		billDetail.setTotalMoney(billDetails.getTotalMoney());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(billDetail);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	
	@RequestMapping(value = "/api/manager_billDetail",method = RequestMethod.DELETE)
	public void deleteBill(@RequestParam("id") int id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			Session s = factory.getCurrentSession();
			BillDetail billDetail = (BillDetail) s.get(BillDetail.class, id);
			session.delete(billDetail);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectBillDetailByID", method = RequestMethod.GET)
	public ResponseEntity<List<BillDetail>> findById(@RequestParam("idBill") String idBill) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM BillDetail WHERE idBill = :idBill";
		Query query = session.createQuery(hql);
		query.setParameter("idBill", idBill);
		List<BillDetail> listBillDetailById = query.list();
		if(listBillDetailById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<BillDetail>>(listBillDetailById, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectAlltop10cao",method = RequestMethod.GET)
	public ResponseEntity<List<thongke>> selectAll(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
 
		String hql = "SELECT productName, COUNT(productName) as idUser FROM BillDetail GROUP BY productName ORDER BY COUNT(productName) DESC";
		List<thongke> BillDetail= session.createQuery(hql).list();
		t.commit();
		if(BillDetail.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<thongke>>(BillDetail, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectAlltop10thap",method = RequestMethod.GET)
	public ResponseEntity<List<BillDetail>> selectAll1(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
 
		String hql = "SELECT productName , COUNT(productName)  FROM BillDetail GROUP BY productName ORDER BY COUNT(productName)";
		List<BillDetail> BillDetail= session.createQuery(hql).list();
		t.commit();
		if(BillDetail.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<BillDetail>>(BillDetail, HttpStatus.OK);
	}
	
}
