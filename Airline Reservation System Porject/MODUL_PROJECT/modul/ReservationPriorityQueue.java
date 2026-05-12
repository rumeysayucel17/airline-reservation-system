// ReservationPriorityQueue.java - Binary heap implementation for reservation priority
import java.util.*;

public class ReservationPriorityQueue {
    private List<Reservation> heap;
    private Map<String, Integer> reservationIndexMap;
    
    public ReservationPriorityQueue() {
        this.heap = new ArrayList<>();
        this.reservationIndexMap = new HashMap<>();
    }
    
    public void add(Reservation reservation) {
        heap.add(reservation);
        reservationIndexMap.put(reservation.getReservationId(), heap.size() - 1);
        heapifyUp(heap.size() - 1);
    }
    
    public Reservation poll() {
        if (heap.isEmpty()) return null;
        
        Reservation top = heap.get(0);
        reservationIndexMap.remove(top.getReservationId());
        
        if (heap.size() == 1) {
            heap.clear();
            return top;
        }
        
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        reservationIndexMap.put(heap.get(0).getReservationId(), 0);
        heapifyDown(0);
        
        return top;
    }
    
    public Reservation peek() {
        return heap.isEmpty() ? null : heap.get(0);
    }
    
    public boolean remove(String reservationId) {
        Integer index = reservationIndexMap.get(reservationId);
        if (index == null) return false;
        
        Reservation toRemove = heap.get(index);
        reservationIndexMap.remove(reservationId);
        
        if (index == heap.size() - 1) {
            heap.remove(heap.size() - 1);
            return true;
        }
        
        heap.set(index, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        reservationIndexMap.put(heap.get(index).getReservationId(), index);
        heapifyDown(index);
        heapifyUp(index);
        
        return true;
    }
    
    public boolean contains(String reservationId) {
        return reservationIndexMap.containsKey(reservationId);
    }
    
    public boolean isEmpty() {
        return heap.isEmpty();
    }
    
    public int size() {
        return heap.size();
    }
    
    public List<Reservation> getAllReservations() {
        return new ArrayList<>(heap);
    }
    
    private void heapifyUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (heap.get(parentIndex).compareTo(heap.get(index)) <= 0) {
                break;
            }
            swap(parentIndex, index);
            index = parentIndex;
        }
    }
    
    private void heapifyDown(int index) {
        while (true) {
            int leftChild = 2 * index + 1;
            int rightChild = 2 * index + 2;
            int smallest = index;
            
            if (leftChild < heap.size() && 
                heap.get(leftChild).compareTo(heap.get(smallest)) < 0) {
                smallest = leftChild;
            }
            
            if (rightChild < heap.size() && 
                heap.get(rightChild).compareTo(heap.get(smallest)) < 0) {
                smallest = rightChild;
            }
            
            if (smallest == index) break;
            
            swap(index, smallest);
            index = smallest;
        }
    }
    
    private void swap(int i, int j) {
        Reservation temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
        
        reservationIndexMap.put(heap.get(i).getReservationId(), i);
        reservationIndexMap.put(heap.get(j).getReservationId(), j);
    }
}

