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

import Web_NoiThat.Bean.Comment;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@Transactional
@RestController(value = "CommentAPI")
public class CommentAPI {
	@Autowired
	SessionFactory factory;
	@RequestMapping(value = "/api/manager_comment",method = RequestMethod.POST)
	public Comment createComment(@RequestBody Comment comment){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		
		
		String hql = "FROM Comment where level = "+comment.getLevel() +" and idProduct = "+comment.getIdProduct()+" and  order_number like '" +comment.getOrder_number()+"%'"; 
		List<Comment> listComment= session.createQuery(hql).list();
		int a =	listComment.size()+1;
		
		if(comment.getOrder_number().length()<1)
		{
			comment.setOrder_number(""+a);
		}else
		{
		String Order_number =comment.getOrder_number()+"."+a ;
		comment.setOrder_number(Order_number);
		}
		try {
			session.save(comment);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
		System.out.print(comment.getOrder_number());
		System.out.print(hql);
		
		return comment;
	}
	@RequestMapping(value = "/api/manager_comment",method = RequestMethod.PUT)
	public void updateComment(@RequestParam("id") int id,
            @RequestBody Comment comments){
		Session s = factory.getCurrentSession();
		Comment comment = (Comment) s.get(Comment.class,id);
		comment.setContent(comments.getContent());
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		try {
			session.update(comment);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/manager_comment",method = RequestMethod.DELETE)
	public void deleteComment(@RequestParam("id") int id){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		System.out.println(id);
		try {
			Session s = factory.getCurrentSession();
			Comment comment = (Comment) s.get(Comment.class, id);
			session.delete(comment);
			t.commit();
		} catch (Exception e) {
			t.rollback();
		}finally {
			session.close();
		}
	}
	@RequestMapping(value = "/api/selectAllComment",method = RequestMethod.GET)
	public ResponseEntity<List<Comment>> selectAll(){
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Comment"; 
		List<Comment> listComment= session.createQuery(hql).list();
		t.commit();
		if(listComment.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Comment>>(listComment, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectCommentByIdProduct", method = RequestMethod.GET)
	public ResponseEntity<List<Comment>> findByIdProduct(@RequestParam("idProduct") int idProduct) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = " FROM Comment WHERE idProduct = :idProduct ORDER BY order_number ASC";
		Query query = session.createQuery(hql);
		query.setParameter("idProduct", idProduct);
		List<Comment> listCommentByIdProduct = query.list();
		if(listCommentByIdProduct == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Comment>>(listCommentByIdProduct, HttpStatus.OK);
	}
	@RequestMapping(value = "/api/selectCommentByID", method = RequestMethod.GET)
	public ResponseEntity<List<Comment>> findById(@RequestParam("idUser") String idUser,@RequestParam("idProduct") String idProduct) {
		Session session = factory.openSession();
		Transaction t = session.beginTransaction();
		String hql = "FROM Comment WHERE idProduct = :idProduct AND idUser = :idUser";
		Query query = session.createQuery(hql);
		query.setParameter("idUser", idUser);
		query.setParameter("idProduct", idProduct);
		List<Comment> listCommentById = query.list();
		if(listCommentById == null) {
			ResponseEntity.notFound().build();
		}
		return new ResponseEntity<List<Comment>>(listCommentById, HttpStatus.OK);
	}
}
