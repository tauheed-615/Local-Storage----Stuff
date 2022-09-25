class Solution {
  divide(N, head) {
    let prev = new Node();

    let curr = new Node();

    let ptr = head.next;

    let temp = head;

    prev = head;

    curr = null;

    while (ptr != null) {
      while (head.data % 2 == 0 && ptr != null) {
        curr = head;

        head = head.next;

        prev = head;

        ptr = head.next;
      }

      if (ptr != null) {
        if (ptr.data % 2 == 0) {
          prev.next = ptr.next;

          ptr.next = head;

          if (curr == null) {
            temp = ptr;

            curr = ptr;
          } else {
            curr.next = ptr;

            curr = ptr;
          }

          ptr = prev.next;
        } else {
          ptr = ptr.next;

          prev = prev.next;
        }
      }
    }

    return temp;
  }
}
