package Web_NoiThat.Controller.API;

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

import Web_NoiThat.Bean.Discount;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "DiscountAPI")
public class DiscountAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_discount",method = RequestMethod.POST)
	public Discount createDiscount(@RequestBody Discount discount){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.save(discount);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		
		return discount;
	}
	@RequestMapping(value = "/api/manager_discount",method = RequestMethod.PUT)
	public void updateDiscount(@RequestParam("id") int id,
            @RequestBody Discount discounts){
		Session s = factory.getCurrentSession();
		Discount discount = (Discount) s.get(Discount.class,id);
		discount.setDeadline(discounts.getDeadline());
		discount.setPercentDiscount(discounts.getPercentDiscount());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(discount);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/manager_discount",method = RequestMethod.DELETE)
	public void deleteDiscount(@RequestParam("id") int id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			Session s = factory.getCurrentSession();
			Discount discount = (Discount) s.get(Discount.class, id);
			session.delete(discount);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectAllDiscount",method = RequestMethod.GET)
	public ResponseEntity<List<Discount>> selectAll(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Discount"; 
		List<Discount> listDiscount= session.createQuery(hql).list();
		t.commit();
		if(listDiscount.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Discount>>(listDiscount, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectDiscountByID", method = RequestMethod.GET)
	public ResponseEntity<List<Discount>> findById(@RequestParam("id") String id) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Discount WHERE id = :id";
		Query query = session.createQuery(hql);
		query.setParameter("id", id);
		List<Discount> listDiscountById = query.list();
		if(listDiscountById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Discount>>(listDiscountById, HttpStatus.OK);
	}
}
