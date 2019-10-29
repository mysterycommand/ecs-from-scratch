using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotator : MonoBehaviour
{
    void Update()
    {
        Vector3 rotation = new Vector3(15f, 30f, 45f);
        transform.Rotate(rotation * Time.deltaTime);
    }
}
