package Web_NoiThat.Controller.API;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Web_NoiThat.Bean.Bill;
import Web_NoiThat.Bean.BillDetail;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "BillAPI")
public class BillAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_bill",method = RequestMethod.POST)
	public Bill createBill(@RequestBody Bill bill){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.save(bill);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		return bill;
	}
	@RequestMapping(value = "/api/manager_bill",method = RequestMethod.PUT)
	public void updateBill(@RequestParam("id") String id,
            @RequestBody Bill bills){
		Session s = factory.getCurrentSession();
		Bill bill = (Bill) s.get(Bill.class,id);
		bill.setStatus(bills.getStatus());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(bill);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/manager_bill",method = RequestMethod.DELETE)
	public void deleteBill(@RequestParam("id") String id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			Session s = factory.getCurrentSession();
			Bill bill = (Bill) s.get(Bill.class, id);
			session.delete(bill);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectAllBill",method = RequestMethod.GET)
	public ResponseEntity<List<Bill>> selectAll(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Bill"; 
		List<Bill> listBill= session.createQuery(hql).list();
		t.commit();
		if(listBill.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Bill>>(listBill, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectBillByID", method = RequestMethod.GET)
	public ResponseEntity<List<Bill>> findById(@RequestParam("idUser") int idUser,@RequestParam("id") String id) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Bill WHERE idUser = :idUser AND id = :id";
		Query query = session.createQuery(hql);
		query.setParameter("idUser", idUser);
		query.setParameter("id", id);
		List<Bill> listBillById = query.list();
		if(listBillById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Bill>>(listBillById, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectBillByUser", method = RequestMethod.GET)
	public ResponseEntity<List<Bill>> selectBillByUser(@RequestParam("idUser") int idUser) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Bill WHERE idUser = :idUser";
		Query query = session.createQuery(hql);
		query.setParameter("idUser", idUser);
		List<Bill> listBillById = query.list();
		if(listBillById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Bill>>(listBillById, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/selectBillByStatus", method = RequestMethod.GET)
	public ResponseEntity<List<Bill>> findByStatus(@RequestParam("idUser") int idUser) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Bill WHERE idUser = :idUser AND NOT status = '4'";
		Query query = session.createQuery(hql);
		query.setParameter("idUser", idUser);
		List<Bill> listBillByStatus = query.list();
		if(listBillByStatus == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Bill>>(listBillByStatus, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/thongketongtienall",method = RequestMethod.GET)
	public ResponseEntity<List<Object[]>>  selectAllall(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "SELECT SUBSTRING(fullname,1), SUM(totalMoney) FROM Bill WHERE status = 3 GROUP BY idUser ORDER BY COUNT(totalMoney) DESC"; 
		List<Object[]> listBill= session.createQuery(hql).list();
		t.commit();
		if(listBill.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Object[]>>(listBill, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/thongketongtien",method = RequestMethod.GET)
	public ResponseEntity<List<Object[]>>  selectAllbyngay(@RequestParam("date") String date,@RequestParam("date1") String date1){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		
		//String hql = "SELECT idUser,fullname as a, SUM(totalMoney) FROM Bill WHERE status =3 and dateOfSale  > '" +date+"' AND dateOfSale < '"+date1+"' GROUP BY idUser ORDER BY COUNT(totalMoney) DESC"; 
		String hql = "SELECT SUBSTRING(fullname,1), SUM(totalMoney) FROM Bill WHERE status =3 and dateOfSale  > '" +date+"' AND dateOfSale < '"+date1+"' GROUP BY idUser ORDER BY SUM(totalMoney) DESC"; 
		
		System.out.println(hql);
		List<Object[]> listBill= session.createQuery(hql).list();
		t.commit();
		if(listBill.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Object[]>>(listBill, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/huyhang",method = RequestMethod.GET)
	public ResponseEntity<List<Object[]>>  selectAllbyhuyhang(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		
		//String hql = "SELECT idUser,fullname as a, SUM(totalMoney) FROM Bill WHERE status =3 and dateOfSale  > '" +date+"' AND dateOfSale < '"+date1+"' GROUP BY idUser ORDER BY COUNT(totalMoney) DESC"; 
		String hql = "SELECT SUBSTRING(fullname,1), COUNT(status) FROM Bill WHERE status =4 ORDER BY COUNT(status) DESC"; 
		
		System.out.println(hql);
		List<Object[]> listBill= session.createQuery(hql).list();
		t.commit();
		if(listBill.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Object[]>>(listBill, HttpStatus.OK);
	}
}
