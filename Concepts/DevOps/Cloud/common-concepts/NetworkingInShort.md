So VNet is something within the same organisation network. Kind of the same internet shared within the building.

Yes, that's a good analogy. Think of it in layers:

```text
Public Internet (everyone)
        |
        ▼
Azure VNet
(your org's private network in Azure)
┌─────────────────────────────────────────────┐
│ AKS Cluster                                 │
│                                             │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐│
│ │ taicc-     │ │ other-     │ │ grafted-  ││
│ │ service    │ │ service    │ │ taxpayer- ││
│ └────────────┘ └────────────┘ └────────────┘│
│                                             │
│ Azure PostgreSQL, Key Vault, other Azure    │
│ PaaS                                        │
└─────────────────────────────────────────────┘
```

**VNet = Azure's virtual private network** — analogous to your office LAN, except it lives in the cloud. Things inside it can talk to each other over private IPs without going out to the internet.

The key difference from your building analogy:

| Your analogy | Azure VNet equivalent |
|--------------|-----------------------|
| Building WiFi/LAN | VNet |
| Same floor | Same subnet within VNet |
| Different buildings (same company) | VNet Peering (two VNets connected) |
| Outside the building | Public internet |

So the **private ingress endpoint** (`taicc-svc-int-dev.platdev.vtxdev.net`) resolves to a **private IP inside the VNet** — only reachable if you're already inside that VNet (whether that's another AKS service, a developer connected via VPN, or another Azure resource in the same VNet). It never touches the public internet.
