## Security
- IAM - Just like Azure IAM
- KMS (Key Management Service)  - Key lifecycle (Operations like Create, Enable / Disable, Rotate, Schedule deletion etc. For more info look below sections) + cryptographic operations (operations like encrypt, decrypt etc. For more info look below sections)
- Secrets Manager - Only for secrets just like github actions secerets for actions.
- ACM (AWS Certificate Manager) - Dedicated servcie for managing certificates. Certificate and KMS (Key management) and Secret Manager (Secret management) all happens through different object types in Azure (See below section for more information)

---

```
HashiCorp Vault and Azure Key Vault (To know how both managed in Azure Key vault look below section)
   ↓
Secrets + key management + cryptographic operations
```

---

### 1. KMS Key Lifecycle Management

These are operations that manage the **existence and state of the key**:

```text
Create
   ↓
Enable / Disable
   ↓
Rotate
   ↓
Change permissions/policies
   ↓
Monitor/Audit
   ↓
Schedule deletion
   ↓
Delete
```

### 2. Cryptographic Operations

These are operations that **use the key**:

```text
Encrypt
Decrypt
Generate Data Key
Sign
Verify
```

So:

> **Encrypt/Decrypt ≠ key lifecycle operations.**

They are **cryptographic operations performed using the key**.

### Your understanding is correct

Your original statement:

> "Encryption is not the lifecycle. It's an extra feature provided by AWS on the keys."

**Yes. Exactly.**

I'd phrase it slightly more precisely:

> **AWS KMS provides key lifecycle management AND cryptographic operations using those keys.**

```text
                 AWS KMS
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
   Key Lifecycle       Cryptographic Operations
          │                   │
      Create              Encrypt
      Rotate              Decrypt
      Enable/Disable      Sign
      Permissions         Verify
      Delete              Generate Data Key
```

---

## Q: How does Azure manage both KMS and Secrets Manager? Do we just store both encryption keys and secrets the same way?

**Yes, from a storage perspective, Azure Key Vault gives you one central place — but keys and secrets are still different object types and are handled differently.**

Think of **Azure Key Vault as one secure vault with different compartments**:

```text
                Azure Key Vault
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       🔑 Keys       🔐 Secrets    📜 Certificates
          │            │
    Encryption       Passwords
    keys              API keys
    Signing keys      DB credentials
```

### Q: So do I store an encryption key and a password the same way?

**No.** You store them **inside the same Key Vault**, but you create different types of objects.

For example:

```text
Azure Key Vault
│
├── Keys
│   └── payment-encryption-key
│
├── Secrets
│   ├── database-password
│   └── stripe-api-key
│
└── Certificates
    └── my-application-certificate
```

Azure Key Vault has three main object types:

* 🔑 **Key** → encryption/signing keys
* 🔐 **Secret** → passwords, API keys, tokens, etc.
* 📜 **Certificate** → digital certificates

So:

> **Azure Key Vault = a secure container that manages Keys + Secrets + Certificates.**

### 🔑 Key

An Azure **Key** is specifically designed for cryptographic operations.

For example:

```text
Application
    ↓
"Encrypt this data"
    ↓
Azure Key Vault Key
    ↓
Encryption operation
```

You generally don't treat the encryption key like a normal password and retrieve its raw value.

### 🔐 Secret

A **Secret** is simply sensitive data that your application needs.

```text
Azure Key Vault
    ↓
database-password
    ↓
"mySecretPassword"
```

Your application can retrieve the secret when it needs it.

---

## Q: Then how does Azure combine KMS + Secrets Manager?

This is the important part:

```text
AWS                              Azure

KMS                              Key Vault
│                                │
├── Keys                         ├── Keys
├── Key lifecycle                ├── Key lifecycle
├── Encrypt/Decrypt              ├── Encrypt/Decrypt
│                                │
Secrets Manager                  ├── Secrets
│                                ├── Certificates
└── Secrets                      └── ...
```

So **Azure didn't simply put encryption keys and passwords into one generic storage bucket**.

Instead:

> **Azure Key Vault is one service containing different object types with different semantics and operations.**

### 🧠 Simple mental model

Think of a physical safe:

```text
             🔐 Azure Key Vault
                    │
       ┌────────────┴────────────┐
       ↓                         ↓
   🔑 KEY DRAWER             🔐 SECRET DRAWER
       │                         │
Encryption keys             DB passwords
Signing keys                API keys
Cryptographic keys          Tokens
```

Both are protected by the **same vault**, but you don't treat them as the same thing.

**So your architecture note can simply say:**

> **Azure Key Vault = Azure's centralized service for managing encryption keys, secrets, and certificates.**


