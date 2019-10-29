using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    public float speed = 1f;
    public Text countText;
    public Text winText;

    private Rigidbody rb;
    private int count = 0;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        SetCountText();
    }

    void FixedUpdate()
    {
        float vertical = Input.GetAxis("Vertical");
        float horizontal = Input.GetAxis("Horizontal");

        Vector3 movement = new Vector3(horizontal, 0f, vertical);
        rb.AddForce(movement * speed);
    }

    void OnTriggerEnter(Collider other)
    {
        if (!other.gameObject.CompareTag("Pick Up")) return;
        other.gameObject.SetActive(false);

        count++;
        SetCountText();
    }

    void SetCountText()
    {
        countText.text = "Count: " + count.ToString();
        winText.text = (count >= 12) ? "You Win!" : "";
    }
}
